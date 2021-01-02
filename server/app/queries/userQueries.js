// lib
const express = require("express");
const router = express.Router();
const dbConnection = require("../connection.js");
const multipart = require("connect-multiparty");
const fs = require("fs");
const bcrypt = require("bcrypt");
const multipartMiddleware = multipart();

const helpers = require("../utils/helpers.js");

const verifyUser = (user) => {
  const searchEmail = "SELECT * FROM user_info WHERE email = ${email}";
  return dbConnection
    .one(searchEmail, user)
    .then(async (res) => {
      const match = await bcrypt.compare(user.password, res.password);
      if (res.user_name === user.user_name && match) return res.user_name;
      else return "Credentials does not match the navigation user name";
    })
    .catch((err) => {
      return "Credentials Mis matched";
    });
};

const uploadImg = (imgObj, userName) => {
  const fileName = imgObj.name || "";
  const path = `/uploads/profileImages/${userName}-${fileName}`;
  const savingPath = `${__dirname}${path}`;
  const newPath = `/attachements/getProfileResume?q=${path}`;
  fs.readFile(imgObj.path, function (err, data) {
    fs.writeFile(savingPath, data, function (err) {});
  });
  return newPath;
};

const uploadResume = (fileObj, userName) => {
  const fileName = fileObj.name || "";
  const path = `/uploads/resumes/${userName}-${fileName}`;
  const savingPath = `${__dirname}${path}`;
  const newPath = `/attachements/getResume?q=${path}`;
  fs.readFile(fileObj.path, function (err, data) {
    fs.writeFile(savingPath, data, function (err) {});
  });
  return newPath;
};

router.post("/getCompleteInfo", async (apiRequest, apiResponse) => {
  dbConnection
    .one("SELECT * FROM user_info WHERE user_name = ${user_name};", apiRequest.body)
    .then((res) => {
      const { password, ...rest } = res;
      dbConnection
        .many("SELECT * FROM portfolio_info WHERE user_name = ${user_name};", apiRequest.body)
        .then((portfolioRes) => {
          apiResponse.send({
            data: {
              user_info: rest,
              portfolio_info: portfolioRes,
            },
          });
        })
        .catch((err) => {
          apiResponse.send({
            data: { user_info: rest, portfolio_info: [] },
          });
        });
    })
    .catch((err) => {
      apiResponse.status(404).send({ error: "We cannot find any portfolio info for this user name" });
    });
});

router.post("/setUser", multipartMiddleware, async (apiRequest, apiResponse) => {
  let updatedData = { ...apiRequest.body.data };
  const { data: fileData = {} } = apiRequest.files;
  const { resume, displayImage } = fileData;
  const { userName } = apiRequest.body.data;
  let query;
  const requiredFields = helpers.findEmptyValues(updatedData, ["email", "password", "phoneNumber", "describeYourSelf", "userName"]);
  if (requiredFields.length) {
    apiResponse.send({
      error: `${requiredFields} are required fields`,
    });
  } else {
    helpers.cryptPassword(apiRequest.body.data.password, (_, hash) => {
      updatedData = { ...apiRequest.body.data, resume: "", displayImage: "", password: hash };
      if (resume) {
        const newPath = uploadResume(resume, userName);
        updatedData = { ...apiRequest.body.data, resume: newPath };
      }
      if (displayImage) {
        const path = uploadImg(displayImage, userName);
        updatedData = { ...updatedData, displayImage: path };
      }
      query =
        "INSERT INTO user_info (email, user_name, phone_number, degree, university, gpa_score, resume, password, gender, describe_your_self, skills, interest, profile_image, linked_in, github, user_image_config) VALUES (${email}, ${userName}, ${phoneNumber}, ${degree}, ${university}, ${gpa}, ${resume}, ${password}, ${gender}, ${describeYourSelf}, ${skills}, ${interests}, ${displayImage}, ${linkedInLink}, ${githubLink}, ${cropValues} ) returning *;";

      dbConnection
        .one(query, updatedData)
        .then((res) => {
          const { password, ...rest } = res;
          apiResponse.send({
            data: { ...rest },
          });
        })
        .catch((err) => {
          const existEmail = err.detail.includes("email");
          const existUserName = err.detail.includes("user_name");
          const message = existEmail ? "Email already exists" : existUserName ? "User name already exists" : "";
          apiResponse.send({
            data: { message: message },
          });
        });
    });
  }
});

router.post("/updateUserInfoCard", multipartMiddleware, (apiRequest, apiResponse) => {
  const { data } = apiRequest.body;
  const { data: fileData = {} } = apiRequest.files;
  const { newResume, newDisplayImage } = fileData;
  const requiredFields = helpers.findEmptyValues(data, ["email", "password", "phoneNumber", "describeYourSelf", "userName"]);
  if (requiredFields.length) {
    apiResponse.send({
      error: `${requiredFields} are required fields`,
    });
  } else {
    verifyUser({ email: data.email, password: data.password, user_name: data.userName }).then(async (userName) => {
      if (userName === "Credentials Mis matched" || userName === "Credentials does not match the navigation user name") {
        apiResponse.send({
          error: "Credentials Mismatched, Please enter correct credentials",
        });
      } else {
        const salt = await helpers.findEncryptionSalt();
        let updatedData = data;

        if (newResume) {
          const newPath = uploadResume(newResume, userName);
          updatedData = { ...updatedData, resumeLink: newPath };
        }

        if (newDisplayImage) {
          const path = uploadImg(newDisplayImage, userName);
          updatedData = { ...updatedData, displayImage: path };
        }

        if (data.newPassword.length) {
          const hashPassword = await helpers.findHash(data.newPassword, salt);
          updatedData = { ...updatedData, hashPassword: hashPassword };
        }

        const query = updatedData.newPassword.length
          ? "UPDATE user_info SET phone_number = ${phoneNumber}, degree = ${degree}, university = ${university}, resume = ${resumeLink}, gpa_score = ${gpa}, skills = ${skills}, interest = ${interests}, password = ${hashPassword}, profile_image = ${displayImage}, describe_your_self = ${describeYourSelf}, linked_in = ${linkedInLink}, github = ${githubLink}, user_image_config = ${cropValues}  WHERE user_name = ${userName} RETURNING *;"
          : "UPDATE user_info SET phone_number = ${phoneNumber}, degree = ${degree}, university = ${university}, resume = ${resumeLink}, gpa_score = ${gpa}, skills = ${skills}, interest = ${interests}, profile_image = ${displayImage}, describe_your_self = ${describeYourSelf}, linked_in = ${linkedInLink}, github = ${githubLink}, user_image_config = ${cropValues}  WHERE user_name = ${userName} RETURNING *;";

        dbConnection
          .one(query, updatedData)
          .then((res) => {
            const { password, ...rest } = res;
            apiResponse.send({
              data: rest,
            });
          })
          .catch((err) => {
            apiResponse.send({
              error: err,
            });
          });
      }
    });
  }
});

module.exports = router;

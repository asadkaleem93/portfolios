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
  const searchUserName = "SELECT * FROM user_info WHERE user_name = ${user_name}";
  const searchEmail = "SELECT * FROM user_info WHERE email = ${email}";
  const requiredFields = helpers.findEmptyValues(updatedData, ["email", "password", "phoneNumber", "describeYourSelf", "userName"]);
  if (requiredFields.length) {
    apiResponse.send({
      error: `${requiredFields} are required fields`,
    });
  } else {
    // Verifying userName
    dbConnection
      .one(searchEmail, updatedData)
      .then((res) => {
        apiResponse.send({
          data: {
            message: "Email already exists",
          },
        });
      })
      .catch((err) => {
        // Verifying email duplication
        dbConnection
          .one(searchUserName, updatedData)
          .then((res) => {
            apiResponse.send({
              data: {
                message: "User name already exists",
              },
            });
          })
          .catch(() => {
            // Enter Data to user_info table with resume
            helpers.cryptPassword(apiRequest.body.data.password, (_, hash) => {
              if (resume) {
                const fileName = resume.name;
                fs.readFile(resume.path, function (err, data) {
                  const path = `/uploads/resumes/${userName}-${fileName}`;
                  const savingPath = `${__dirname}${path}`;
                  const newPath = `/attachements/getResume?q=${path}`;
                  updatedData = { resume: newPath, ...apiRequest.body.data, password: hash, displayImage: "" };
                  if (displayImage) {
                    const path = uploadImg(displayImage, userName);
                    updatedData = { ...updatedData, displayImage: path };
                  }
                  query =
                    "INSERT INTO user_info (email, user_name, phone_number, degree, university, gpa_score, resume, password, gender, describe_your_self, skills, interest, profile_image, linked_in, github, user_image_config) VALUES (${email}, ${userName}, ${phoneNumber}, ${degree}, ${university}, ${gpa}, ${resume}, ${password}, ${gender}, ${describeYourSelf}, ${skills}, ${interests}, ${displayImage}, ${linkedInLink}, ${githubLink}, ${cropValues} ) returning ${email};";
                  dbConnection
                    .one(query, updatedData)
                    .then((res) => {
                      fs.writeFile(savingPath, data, function (err) {});
                      apiResponse.send({
                        data: updatedData,
                      });
                    })
                    .catch((err) => {
                      apiResponse.send({
                        error: err.detail,
                      });
                    });
                });
              }
              // Enter Data to user_info table without resume
              else {
                delete apiRequest.body.data.file;
                delete apiRequest.body.data.password;
                updatedData = { ...apiRequest.body.data, password: hash, displayImage: "" };
                if (displayImage) {
                  const path = uploadImg(displayImage, userName);
                  updatedData = { ...updatedData, displayImage: path };
                }
                query =
                  "INSERT INTO user_info (email, user_name, phone_number, degree, university, gpa_score, password, gender, describe_your_self, skills, interest, profile_image, linked_in, github, user_image_config ) VALUES (${email}, ${userName}, ${phoneNumber}, ${degree}, ${university}, ${gpa}, ${password}, ${gender}, ${describeYourSelf}, ${skills}, ${interests}, ${displayImage}, ${linkedInLink}, ${githubLink}, ${cropValues}) returning ${email};";
                dbConnection
                  .one(query, updatedData)
                  .then((res) => {
                    apiResponse.send({
                      data: { resume: "", ...apiRequest.body.data, displayImage: "" },
                    });
                  })
                  .catch((err) => {
                    apiResponse.send({
                      error: err.detail,
                    });
                  });
              }
            });
          });
      });
  }
});

router.post("/updateUserInfoCard", multipartMiddleware, (apiRequest, apiResponse) => {
  const { data } = apiRequest.body;
  const { data: fileData = {} } = apiRequest.files;
  const { resume, newDisplayImage } = fileData;
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
        let hashPassword = "";
        let query = "";
        if (data.newPassword.length) hashPassword = await helpers.findHash(data.newPassword, salt);
        // IF RESUME IS UPLOADED
        if (resume) {
          const fileName = resume.name || "";
          const path = `/uploads/resumes/${userName}-${fileName}`;
          const savingPath = `${__dirname}${path}`;
          const newPath = `/attachements/getResume?q=${path}`;

          updatedData = {
            ...data,
            resume_link: newPath,
            displayImage: data.displayImage,
            hashPassword,
          };

          fs.readFile(resume.path, function (err, data) {
            fs.writeFile(savingPath, data, function (err) {});
          });

          if (newDisplayImage) {
            const path = uploadImg(newDisplayImage, userName);
            updatedData = { ...updatedData, displayImage: path };
          }

          query = updatedData.newPassword.length
            ? "UPDATE user_info SET phone_number = ${phoneNumber}, degree = ${degree}, university = ${university}, resume = ${resume_link}, gpa_score = ${gpa}, skills = ${skills}, interest = ${interests}, password = ${hashPassword}, profile_image = ${displayImage}, describe_your_self = ${describeYourSelf}, linked_in = ${linkedInLink}, github = ${githubLink}, user_image_config = ${cropValues}  WHERE user_name = ${userName} RETURNING *;"
            : "UPDATE user_info SET phone_number = ${phoneNumber}, degree = ${degree}, university = ${university}, resume = ${resume_link}, gpa_score = ${gpa}, skills = ${skills}, interest = ${interests}, profile_image = ${displayImage}, describe_your_self = ${describeYourSelf}. linked_in = ${linkedInLink}, github = ${githubLink} , user_image_config = ${cropValues} WHERE user_name = ${userName} RETURNING *;";
        } else {
          updatedData = {
            ...data,
            hashPassword,
            displayImage: data.displayImage,
          };

          if (newDisplayImage) {
            const path = uploadImg(newDisplayImage, userName);
            updatedData = { ...updatedData, displayImage: path };
          }
          query = updatedData.newPassword.length
            ? "UPDATE user_info SET phone_number = ${phoneNumber}, degree = ${degree}, university = ${university}, resume = ${resumeLink}, gpa_score = ${gpa}, skills = ${skills}, interest = ${interests}, password = ${hashPassword}, profile_image = ${displayImage}, describe_your_self = ${describeYourSelf}, linked_in = ${linkedInLink}, github = ${githubLink}, user_image_config = ${cropValues}  WHERE user_name = ${userName} RETURNING *;"
            : "UPDATE user_info SET phone_number = ${phoneNumber}, degree = ${degree}, university = ${university}, resume = ${resumeLink}, gpa_score = ${gpa}, skills = ${skills}, interest = ${interests}, profile_image = ${displayImage}, describe_your_self = ${describeYourSelf}, linked_in = ${linkedInLink}, github = ${githubLink}, user_image_config = ${cropValues}  WHERE user_name = ${userName} RETURNING *;";
        }

        dbConnection
          .one(query, updatedData)
          .then((res) => {
            const { password, ...rest } = res;
            apiResponse.send({
              data: rest,
            });
          })
          .catch((err) => {
            console.log("ERR -->", err);
            apiResponse.send({
              error: err,
            });
          });
      }
    });
  }
});

module.exports = router;

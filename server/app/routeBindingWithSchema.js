// lib
const express = require("express");
const router = express.Router();
const dbConnection = require("./connection.js");
const multipart = require("connect-multiparty");
const fs = require("fs");
const bcrypt = require("bcrypt");
const multipartMiddleware = multipart();

const helpers = require("./utils/helpers.js");

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
      console.log("err", err);
      return "Credentials Mis matched";
    });
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
      apiResponse.send({
        error: "We cannot find any portfolio info for this user name",
      });
    });
});

router.post("/setUser", multipartMiddleware, async (apiRequest, apiResponse) => {
  let updatedData = { ...apiRequest.body };
  let query;
  const searchUserName = "SELECT * FROM user_info WHERE user_name = ${user_name}";
  const searchEmail = "SELECT * FROM user_info WHERE email = ${email}";
  const requiredFields = helpers.findEmptyValues(updatedData, ["email", "password", "phone_number", "describe_your_self", "user_name"]);
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
            helpers.cryptPassword(apiRequest.body.password, (_, hash) => {
              if (apiRequest.files.file) {
                const { user_name } = apiRequest.body;
                const fileName = apiRequest.files.file.name;
                fs.readFile(apiRequest.files.file.path, function (err, data) {
                  const path = `/uploads/resumes/${user_name}-${fileName}`;
                  const savingPath = `${__dirname}${path}`;
                  const newPath = `/getResume?q=${path}`;
                  updatedData = { resume: newPath, ...apiRequest.body, password: hash };
                  query =
                    "INSERT INTO user_info (email, user_name, phone_number, degree, university, gpa_score, resume, password, gender, describe_your_self, skills, interest) VALUES (${email}, ${user_name}, ${phone_number}, ${degree}, ${university}, ${score}, ${resume}, ${password}, ${gender}, ${describe_your_self}, ${skills}, ${interest}) returning ${email};";
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
                delete apiRequest.body.file;
                delete apiRequest.body.password;
                updatedData = { ...apiRequest.body, password: hash };
                query =
                  "INSERT INTO user_info (email, user_name, phone_number, degree, university, gpa_score, password, gender, describe_your_self, skills, interest ) VALUES (${email}, ${user_name}, ${phone_number}, ${degree}, ${university}, ${score}, ${password}, ${gender}, ${describe_your_self}, ${skills}, ${interest}) returning ${email};";
                dbConnection
                  .one(query, updatedData)
                  .then((res) => {
                    apiResponse.send({
                      data: { resume: null, ...apiRequest.body },
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

router.get("/getResume", (req, res) => {
  // console.log("req.query.q -->", __dirname);
  const file = `${__dirname}${req.query.q}`;
  res.download(file);
  // fs.readFile(`${__dirname}${req.query.q}`, { encoding: "utf-8" }, function (err, content) {
  //   if (err) {
  //     res.writeHead(400, { "Content-type": "text/html" });
  //     res.end("No resume available for this user");
  //   } else {
  //     res.setHeader("Content-type", "text/html");
  //     // res.setHeader('Content-disposition', 'attachment; filename=asad-credential.txt');
  //     // res.writeHead(200, { "Content-type": "text/html" });
  //     // res.write(content);
  //     res.download(content,'asad-credential.txt');
  //   }
  // });
});

router.get("/getImage", (req, res) => {
  const mime = {
    jpg: "image/jpeg",
    png: "image/png",
    svg: "image/svg+xml",
  };
  const splitType = req.query.q.split(".");
  const typeLength = splitType.length;
  const type = splitType[typeLength - 1];
  fs.readFile(`${__dirname}${req.query.q}`, function (err, content) {
    if (err) {
      res.writeHead(400, { "Content-type": "text/html" });
      res.end("No Image available");
    } else {
      //specify the content type in the response will be an image
      res.writeHead(200, { "Content-type": mime[type] });
      res.write(content);
      res.end(content);
    }
  });
});

router.post("/setPortfolioCards", multipartMiddleware, (apiRequest, apiResponse) => {
  const { data } = apiRequest.body;
  const { data: cardsData = {} } = apiRequest.files;
  const { cards: imageCards = [] } = cardsData;
  const { userInfo, cards } = data;
  const requiredFields = cards.map((card) => helpers.findEmptyValues(card, ["name", "description"]));
  if (requiredFields.join("").length) {
    apiResponse.send({
      error: `name, description of one or many cards are missing are required fields`,
    });
  } else {
    verifyUser(userInfo).then(async (userName) => {
      if (userName === "Credentials Mis matched" || userName === "Credentials does not match the navigation user name") {
        apiResponse.send({
          error: "Credentials Mismatched, Please enter correct credentials",
        });
      } else {
        dbConnection
          .task(async (t) => {
            const itemDetails = cards.map(async (card, index) => {
              const image = imageCards.find((imageCard) => imageCard.image.fieldName.includes(`[${index}]`));
              let updatedData;
              if (!image) {
                updatedData = {
                  img_link: "",
                  user_name: userName,
                  ...card,
                };
              } else {
                const path = `/uploads/images/${userName}-${card.name}-${image.image.originalFilename}`;
                const savingPath = `${__dirname}${path}`;
                const newPath = `/getImage?q=${path}`;
                updatedData = {
                  img_link: newPath,
                  user_name: userName,
                  ...card,
                };
                fs.readFile(image.image.path, function (err, data) {
                  fs.writeFile(savingPath, data, function (err) {});
                });
              }
              const query = await t.one("INSERT INTO portfolio_info (name, description, url, img_link, user_name) VALUES (${name}, ${description}, ${url}, ${img_link}, ${user_name}) returning id, img_link;", updatedData);
              updatedData = {};
              return { query };
            });

            const details = await t.batch(itemDetails);

            return { details };
          })
          .then((events, index) => {
            const updatedResp = events.details.map((event, index) => {
              const { image, ...rest } = cards[index];
              return {
                ...event.query,
                ...rest,
                user_name: userName,
              };
            });
            apiResponse.send({
              data: updatedResp,
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

router.delete("/deletePortfolioCard", (apiRequest, apiResponse) => {
  const query = "DELETE FROM portfolio_info WHERE id = ${id} AND user_name = ${userName} RETURNING *;";
  dbConnection
    .one(query, apiRequest.body)
    .then((res) => {
      apiResponse.send({
        data: "Row deleted successfully",
      });
    })
    .catch((err) => {
      apiResponse.send({
        error: err,
      });
    });
});

router.post("/updatePortfolioCard", multipartMiddleware, (apiRequest, apiResponse) => {
  const { data } = apiRequest.body;
  const { data: imageData = {} } = apiRequest.files;
  const { image } = imageData;
  const requiredFields = helpers.findEmptyValues(data, ["email", "password", "name", "description", "userName"]);
  if (requiredFields.length) {
    apiResponse.send({
      error: `${requiredFields} are required fields`,
    });
  } else {
    verifyUser({ email: data.email, password: data.password, user_name: data.userName }).then((userName) => {
      if (userName === "Credentials Mis matched" || userName === "Credentials does not match the navigation user name") {
        apiResponse.send({
          error: "Credentials Mismatched, Please enter correct credentials",
        });
      } else {
        if (image) {
          const path = "/uploads/images/${userName}-${data.name}-${image.originalFilename}";
          const savingPath = `${__dirname}${path}`;
          const newPath = `/getImage?q=${path}`;
          updatedData = {
            ...data,
            img_link: newPath,
          };
          fs.readFile(image.path, function (err, data) {
            fs.writeFile(savingPath, data, function (err) {});
          });

          // TODO: reuse this connection
          const query = "UPDATE portfolio_info SET name = ${name}, description = ${description}, url = ${url}, img_link = ${img_link} WHERE user_name = ${userName} AND id = ${id} RETURNING *;";
          dbConnection
            .one(query, updatedData)
            .then((res) => {
              apiResponse.send({
                data: res,
              });
            })
            .catch((err) => {
              apiResponse.send({
                error: err,
              });
            });
        } else {
          const query = "UPDATE portfolio_info SET name = ${name}, description = ${description}, url = ${url}, img_link = ${imgLink} WHERE user_name = ${userName} AND id = ${id} RETURNING *;";
          dbConnection
            .one(query, data)
            .then((res) => {
              apiResponse.send({
                data: res,
              });
            })
            .catch((err) => {
              apiResponse.send({
                error: err,
              });
            });
        }
      }
    });
  }
});

router.post("/updateUserInfoCard", multipartMiddleware, (apiRequest, apiResponse) => {
  const { data } = apiRequest.body;
  const { data: fileData = {} } = apiRequest.files;
  const { newResume } = fileData;
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
        const salt = await bcrypt.genSalt(10);
        let hashPassword = "";
        let query = "";
        if (data.newPassword.length) hashPassword = await bcrypt.hash(data.newPassword, salt);
        if (newResume) {
          const fileName = newResume.name || "";
          const path = `/uploads/resumes/${userName}-${fileName}`;
          const savingPath = `${__dirname}${path}`;
          const newPath = `/getResume?q=${path}`;
          fs.readFile(newResume.path, function (err, data) {
            fs.writeFile(savingPath, data, function (err) {});
          });
          updatedData = {
            ...data,
            resume_link: newPath,
            hashPassword,
          };
          query = updatedData.newPassword.length
            ? "UPDATE user_info SET phone_number = ${phoneNumber}, degree = ${degree}, university = ${university}, resume = ${resume_link}, gpa_score = ${gpa}, skills = ${skills}, interest = ${interests}, password = ${hashPassword} WHERE user_name = ${userName} RETURNING *;"
            : "UPDATE user_info SET phone_number = ${phoneNumber}, degree = ${degree}, university = ${university}, resume = ${resume_link}, gpa_score = ${gpa}, skills = ${skills}, interest = ${interests}  WHERE user_name = ${userName} RETURNING *;";
        } else {
          updatedData = {
            ...data,
            hashPassword,
          };
          query = updatedData.newPassword.length
            ? "UPDATE user_info SET phone_number = ${phoneNumber}, degree = ${degree}, university = ${university}, resume = ${resumeLink}, gpa_score = ${gpa}, skills = ${skills}, interest = ${interests}, password = ${hashPassword} WHERE user_name = ${userName} RETURNING *;"
            : "UPDATE user_info SET phone_number = ${phoneNumber}, degree = ${degree}, university = ${university}, resume = ${resumeLink}, gpa_score = ${gpa}, skills = ${skills}, interest = ${interests}  WHERE user_name = ${userName} RETURNING *;";
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
            apiResponse.send({
              error: err,
            });
          });
      }
    });
  }
});

module.exports = router;

// lib
const express = require("express");
const router = express.Router();
const dbConnection = require("./connection.js");
const multipart = require("connect-multiparty");
const fs = require("fs");
const multipartMiddleware = multipart();

const verifyUser = (user) => {
  const searchEmail = "SELECT * FROM user_info WHERE email = ${email} and password = ${password}";
  return dbConnection
    .one(searchEmail, user)
    .then((res) => {
      if (res.user_name === user.user_name) return res.user_name;
      else return "Credentials does not match the navigation user name";
    })
    .catch((err) => {
      return "Credentials Mis matched";
    });
};

router.post("/getCompleteInfo", async (apiRequest, apiResponse) => {
  dbConnection
    .one("SELECT * FROM user_info WHERE user_name = ${user_name};", apiRequest.body)
    .then((res) => {
      dbConnection.many("SELECT * FROM portfolio_info WHERE user_name = ${user_name};", apiRequest.body).then((portfolioRes) => {
        const { password, ...rest } = res;
        apiResponse.send({
          data: {
            user_info: rest,
            portfolio_info: portfolioRes,
          },
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
          if (apiRequest.files.file) {
            const { user_name } = apiRequest.body;
            const fileName = apiRequest.files.file.name;
            fs.readFile(apiRequest.files.file.path, function (err, data) {
              const savingPath = `${__dirname}/uploads/resumes/${user_name}-${fileName}`;
              const newPath = `/getResume?q=${savingPath}`;
              updatedData = { resume: newPath, ...apiRequest.body };
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

router.get("/getResume", (req, res) => {
  fs.readFile(req.query.q, { encoding: "utf-8" }, function (err, content) {
    if (err) {
      res.writeHead(400, { "Content-type": "text/html" });
      console.log(err);
      res.end("No resume available for this user");
    } else {
      //specify the content type in the response will be an image
      res.writeHead(200, { "Content-type": "text/html" });
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
  const query = "INSERT INTO portfolio_info (name, description, url, img_link, user_name) VALUES (${name}, ${description}, ${link}, ${img_link}, ${user_name}) returning ${user_name};";
  verifyUser(userInfo).then(async (userName) => {
    if (userName === "Credentials Mis matched" || userName === "Credentials does not match the navigation user name") {
      apiResponse.send({
        error: "Credentials Mismatched, Please enter correct credentials",
      });
    } else {
      const updatedCards = cards.reduce((acc, card, index) => {
        console.log("ACC -->", acc);
        const image = imageCards.find((imageCard) => imageCard.image.fieldName.includes(`[${index}]`));
        if (!image) {
          const updatedData = {
            img_link: "",
            user_name: userName,
            ...card,
          };
          dbConnection
            .one(query, updatedData)
            .then(() => {
              console.log(";;;;", [...acc, updatedData]);
              return [...acc, updatedData];
            })
            .catch((err) => {});
        } else {
          fs.readFile(image.image.path, function (err, data) {
            const savingPath = `${__dirname}/uploads/images/${userName}-${card.name}-${image.image.originalFilename}`;
            const newPath = `/getImage?q=${savingPath}`;
            const updatedData = {
              img_link: newPath,
              user_name: userName,
              ...card,
            };
            dbConnection
              .one(query, updatedData)
              .then(() => {
                fs.writeFile(savingPath, data, function (err) {});
                console.log("second ;;;;", [...acc, updatedData]);
                return [...acc, updatedData];
              })
              .catch((err) => {});
          });
        }
      }, []);
      console.log("updatedCards -->", updatedCards);
      apiResponse.send({
        data: updatedCards,
      });
    }
  });
});

module.exports = router;

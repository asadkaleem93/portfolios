// lib
const express = require("express");
const router = express.Router();
const dbConnection = require("../connection.js");
const multipart = require("connect-multiparty");
const bcrypt = require("bcrypt");
const fs = require("fs");
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
                const path = `/uploads/images/${userName}-${image.image.originalFilename}`;
                const savingPath = `${__dirname}${path}`;
                const newPath = `/attachements/getImage?q=${path}`;
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
        let updatedData;
        let query;
        if (image) {
          const path = `/uploads/images/${userName}-${image.originalFilename}`;
          const savingPath = `${__dirname}${path}`;
          const newPath = `/attachements/getImage?q=${path}`;

          updatedData = {
            ...data,
            img_link: newPath,
          };
          fs.readFile(image.path, function (err, data) {
            fs.writeFile(savingPath, data, function (err) {});
          });
          query = "UPDATE portfolio_info SET name = ${name}, description = ${description}, url = ${url}, img_link = ${img_link} WHERE user_name = ${userName} AND id = ${id} RETURNING *;";
        } else {
          query = "UPDATE portfolio_info SET name = ${name}, description = ${description}, url = ${url}, img_link = ${imgLink} WHERE user_name = ${userName} AND id = ${id} RETURNING *;";
          updatedData = { ...data };
        }

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
      }
    });
  }
});

module.exports = router;

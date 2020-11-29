// lib
const express = require('express');
const router = express.Router();
const dbConnection = require('./connection.js');
const multipart = require("connect-multiparty");
const fs = require("fs");
const multipartMiddleware = multipart();

router.post('/getPortfolio', async (apiRequest, apiResponse) => {
  dbConnection.many('SELECT * FROM portfolio_info WHERE user_name = ${user_name};', apiRequest.body)
  .then((res) => {
    apiResponse.send({
      data: res
    })
  })
  .catch((err) => {
    apiResponse.send({
      error: "We cannot find any portfolio info for this user name"
    })
  });
});

router.post('/setUser', multipartMiddleware, async (apiRequest, apiResponse) => {
  let updatedData = { ...apiRequest.body };
  let query;
  const searchUserName = 'SELECT * FROM user_info WHERE user_name = ${user_name}';
  const searchEmail = 'SELECT * FROM user_info WHERE email = ${email}';

  // Verifying userName
  dbConnection.one(searchEmail, updatedData)
  .then((res) => {
    apiResponse.send({
      data: {
        message: "Email already exists"
      }
    })
  }).catch((err) => {
    // Verifying email duplication
    dbConnection.one(searchUserName, updatedData)
    .then((res) => {
      apiResponse.send({
        data: {
          message: "User name already exists"
        }
      })
    }).catch(() => {
        // Enter Data to user_info table with resume
        if (apiRequest.files.file) {
          const {user_name} = apiRequest.body;
          const fileName = apiRequest.files.file.name;  
          fs.readFile(apiRequest.files.file.path, function(err, data) {
            const savingPath = `./uploads/resumes/${user_name}-${fileName}`;
            const newPath = `/getResume?q=${savingPath}`;
              updatedData = {resume: newPath, ...apiRequest.body }
              query = 'INSERT INTO user_info(email, user_name, phone_number, degree, university, gpa_score, resume, password, gender) VALUES (${email}, ${user_name}, ${phone_number}, ${degree}, ${university}, ${score}, ${resume}, ${password}, ${gender}) returning ${email};'
              dbConnection.one(query, updatedData)
              .then((res) => {
                fs.writeFile(savingPath, data, function(err) {});
                apiResponse.send({
                  data: updatedData
                })
              })
              .catch((err) => {
                apiResponse.send({
                  error: err.detail
                })
              }); 
          })
        }
        // Enter Data to user_info table without resume
        else {
          delete(apiRequest.body.file)
          delete(apiRequest.body.password)
          query = 'INSERT INTO user_info(email, user_name, phone_number, degree, university, gpa_score, password, gender ) VALUES (${email}, ${user_name}, ${phone_number}, ${degree}, ${university}, ${score}, ${password}, ${gender}) returning ${email};'
          dbConnection.one(query, updatedData)
          .then((res) => {
            apiResponse.send({
              data: {resume: null, ...apiRequest.body}
            })
          })
          .catch((err) => {
            apiResponse.send({
              error: err.detail
            })
          }); 
        }
    })
  })
        
  
});

router.get("/getResume", (req, res) => {
  fs.readFile(req.query.q,{encoding: 'utf-8'}, function(err, content) {
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


module.exports = router;

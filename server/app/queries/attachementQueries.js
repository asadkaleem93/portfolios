// lib
const express = require("express");
const router = express.Router();
const fs = require("fs");

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

router.get("/getProfileResume", (req, res) => {
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

router.get("/getResume", (req, res) => {
  const file = `${__dirname}${req.query.q}`;
  res.download(file);
});

module.exports = router;

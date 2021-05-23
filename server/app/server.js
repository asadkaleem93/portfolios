const express = require("express");
const app = express();
const cors = require("cors");
var bodyParser = require("body-parser");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.use(cors());

const portfolioRoutes = require("./queries/portfolioQueries.js");
const userRoutes = require("./queries/userQueries.js");
const attachementRoutes = require("./queries/attachementQueries.js");

const API_PORT = process.env.PORT || 3001;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// route middleware that will happen on every request
app.use(async function (req, res, next) {
  // continue doing what we were doing and go to the route
  next();
});
app.use("/portfolios/", portfolioRoutes);
app.use("/user/", userRoutes);
app.use("/attachements/", attachementRoutes);

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

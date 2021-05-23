// lib
const pgp = require("pg-promise")({});

const connection = {
  host: process.env.HOST,
  port: process.env.DBPORT,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
  application_name: "Portfolios",
  max: 10,
  ssl: true,
};

const dbConnection = pgp(connection);

module.exports = dbConnection;

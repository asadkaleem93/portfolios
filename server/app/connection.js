// lib
const pgp = require('pg-promise')({});

const connection = {
  host: 'localhost', // server name or IP address;
  port: 5432,
  database: 'portfolios',
  user: 'macbook',
  password: '626883'
};

const dbConnection = pgp(connection);

module.exports = dbConnection;

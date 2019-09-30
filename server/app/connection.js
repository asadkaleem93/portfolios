// lib
const pgp = require('pg-promise')({});

const cn = {
  host: 'localhost', // server name or IP address;
  port: 5432,
  database: 'portfolios',
  user: 'asad',
  password: '626883'
};

const dbConnection = pgp(cn);

module.exports = dbConnection;

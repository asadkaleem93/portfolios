const express = require('express');
const app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
const routes = require('./routeBindingWithSchema.js');
const dbConnection = require('./connection.js');

const API_PORT = 3001;
app.use(cors());

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// route middleware that will happen on every request
app.use(async function(req, res, next) {
  // continue doing what we were doing and go to the route
  next();
});

app.use('/', routes);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

const express = require('express');
const app = express();
var cors = require('cors');
const routes = require('./routeBindingWithSchema.js');

const API_PORT = 3001;
app.use(cors());

// route middleware that will happen on every request
app.use(function(req, res, next) {
  console.log('REQ METHID AND URL -->', req.method, req.url);

  // continue doing what we were doing and go to the route
  next();
});

app.use('/', routes);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

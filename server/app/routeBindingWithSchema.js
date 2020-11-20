// lib
const express = require('express');
const router = express.Router();
const dbConnection = require('./connection.js');
// const graphqlHTTP = require('express-graphql');
// const { GraphQLSchema } = require('graphql');

// src
// const { portfolioQueries } = require('./queries/portfolioQueries.js');
// const { portfolioMutations } = require('./mutations/portfolioMutations.js');

// const schema = new GraphQLSchema({
//   query: portfolioQueries,
//   mutation: portfolioMutations
// });

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

module.exports = router;

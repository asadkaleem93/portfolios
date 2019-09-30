// lib
const express = require('express');
const router = express.Router();
const graphqlHTTP = require('express-graphql');
const { GraphQLSchema } = require('graphql');

// src
const { portfolioQueries } = require('./queries/portfolioQueries.js');
const { portfolioMutations } = require('./mutations/portfolioMutations.js');

const schema = new GraphQLSchema({
  query: portfolioQueries,
  mutation: portfolioMutations
});

router.use(
  '/',
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);

module.exports = router;

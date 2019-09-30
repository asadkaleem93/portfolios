// lib
const express = require('express');
const router = express.Router();
const graphqlHTTP = require('express-graphql');
const { GraphQLSchema } = require('graphql');

// src
const { portfoliosQuery } = require('../../queries/portfoliosQuery.js');

// Define SCHEMAS
const portfolioSchema = new GraphQLSchema({ query: portfoliosQuery });
router.use(
  '/',
  graphqlHTTP({
    schema: portfolioSchema,
    graphiql: true
  })
);

module.exports = router;

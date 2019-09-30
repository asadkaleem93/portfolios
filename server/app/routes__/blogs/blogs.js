// lib
const express = require('express');
const router = express.Router();
const graphqlHTTP = require('express-graphql');
const { GraphQLSchema } = require('graphql');

// src
const { createBlogsQuery } = require('../../queries/createBlogsQuery.js');

// Define SCHEMAS
const createBlogSchema = new GraphQLSchema({ mutation: createBlogsQuery });
router.use(
  '/',
  graphqlHTTP({
    schema: createBlogSchema,
    graphiql: true
  })
);

module.exports = router;

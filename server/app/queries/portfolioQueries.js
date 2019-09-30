// lib
const { GraphQLObjectType, GraphQLList, GraphQLString } = require('graphql');

// src
const { portfoliosType, blogsType } = require('./types/types.js');
const dbConnection = require('../connection.js');

const portfolioQueries = new GraphQLObjectType({
  name: 'Query',
  fields: {
    portfolioOwners: {
      type: new GraphQLList(portfoliosType),
      resolve: async function(source, args) {
        let response = [];
        const query = 'select * from portfolios_owners';
        await dbConnection
          .result(query)
          .then(user => {
            response = [...user.rows];
          })
          .catch(error => error);
        return response;
      }
    },
    blogs: {
      type: new GraphQLList(blogsType),
      resolve: async function(source, args) {
        let response = [];
        const query = 'SELECT * FROM blogs';
        await dbConnection
          .result(query)
          .then(res => {
            response = [...res.rows];
          })
          .catch(err => console.error('ERROR -->', err));
        return response;
      }
    }
  }
});

exports.portfolioQueries = portfolioQueries;

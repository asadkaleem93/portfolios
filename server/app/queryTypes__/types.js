// lib
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLInputObjectType
} = require('graphql');
let { movies } = require('./data.js');

// Define Portfolio Type
portfoliosType = new GraphQLObjectType({
  name: 'PortfoliosType',
  fields: {
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  }
});

// inputCreateBlogs = new GraphQLObjectType({
//   name: 'createBlogsInput',
//   fields: {
//     blog_name: { type: GraphQLString },
//     blog_description: { type: GraphQLString },
//     blog_link: { type: GraphQLString }
//   }
// });

createBlogs = new GraphQLObjectType({
  name: 'createBlogs',
  fields: {
    blog_name: { type: GraphQLString },
    blog_description: { type: GraphQLString },
    blog_link: { type: GraphQLString }
  }
});
createBlogsInputTypes = new GraphQLInputObjectType({
  name: 'createBlogsInput',
  fields: {
    blog_name: { type: GraphQLString },
    blog_description: { type: GraphQLString },
    blog_link: { type: GraphQLString }
  }
});

// // Define Movie Type
// movieType = new GraphQLObjectType({
//   name: 'Movie',
//   fields: {
//     id: { type: GraphQLID },
//     name: { type: GraphQLString },
//     year: { type: GraphQLInt },
//     directorId: { type: GraphQLID }
//   }
// });

// exports.movieType = movieType;

exports.portfoliosType = portfoliosType;
exports.createBlogs = createBlogs;
exports.createBlogsInputTypes = createBlogsInputTypes;
// exports.inputCreateBlogs = inputCreateBlogs;
// exports.directorType = directorType;

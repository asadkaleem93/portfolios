// lib
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLInputObjectType
} = require('graphql');

// Define Portfolio Type
portfoliosType = new GraphQLObjectType({
  name: 'PortfoliosType',
  fields: {
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    password: { type: GraphQLString }
  }
});

blogsType = new GraphQLObjectType({
  name: 'blogs',
  fields: {
    blog_name: { type: GraphQLString },
    blog_description: { type: GraphQLString },
    blog_link: { type: GraphQLString },
    blog_img: { type: GraphQLString }
  }
});

exports.portfoliosType = portfoliosType;
exports.blogsType = blogsType;

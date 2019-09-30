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

createBlog = new GraphQLObjectType({
  name: 'createBlogs',
  fields: {
    blog_name: { type: GraphQLString },
    blog_description: { type: GraphQLString },
    blog_link: { type: GraphQLString }
  }
});
createBlogInput = new GraphQLInputObjectType({
  name: 'createBlogsInput',
  fields: {
    blog_name: { type: GraphQLString },
    blog_description: { type: GraphQLString },
    blog_link: { type: GraphQLString }
  }
});

deleteBlog = new GraphQLObjectType({
  name: 'deleteBlog',
  fields: {
    status: { type: GraphQLInt }
  }
});

deleteBlogInput = new GraphQLInputObjectType({
  name: 'deleteBlogInput',
  fields: {
    id: { type: GraphQLInt }
  }
});

updateBlog = new GraphQLObjectType({
  name: 'updateBlog',
  fields: {
    blog_name: { type: GraphQLString },
    blog_description: { type: GraphQLString },
    blog_link: { type: GraphQLString }
  }
});

updateBlogInput = new GraphQLInputObjectType({
  name: 'updateBlogInput',
  fields: {
    blog_name: { type: GraphQLString },
    blog_description: { type: GraphQLString },
    blog_link: { type: GraphQLString }
  }
});

exports.createBlog = createBlog;
exports.createBlogInput = createBlogInput;
exports.deleteBlog = deleteBlog;
exports.deleteBlogInput = deleteBlogInput;
exports.updateBlog = updateBlog;
exports.updateBlogInput = updateBlogInput;

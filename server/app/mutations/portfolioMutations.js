// lib
const { GraphQLObjectType, GraphQLString } = require('graphql');

// src
const {
  createBlog,
  createBlogInput,
  deleteBlog,
  deleteBlogInput,
  updateBlog,
  updateBlogInput
} = require('./types/types.js');
const dbConnection = require('../connection.js');

// let { movies, directors } = require('../queryTypes/data');

const portfolioMutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    createblog: {
      type: createBlog,
      args: { input: { type: createBlogInput } },
      resolve: async function(source, args) {
        let response;
        const text =
          'INSERT INTO blogs (portfolio_id, blog_name, blog_description, blog_link) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [1, args.input.blog_name, args.input.blog_description, args.input.blog_link];

        await dbConnection
          .query(text, values)
          .then(res => {
            response = {
              blog_name: res[0].blog_name,
              blog_description: res[0].blog_description,
              blog_link: res[0].blog_link
            };
          })
          .catch(e => console.error('ERROR -->', e.stack));
        return response;
      }
    },
    updateblog: {
      type: updateBlog,
      args: { input: { type: updateBlogInput } },
      resolve: async function(source, args) {
        let response;
        const text =
          'UPDATE blogs SET blog_name = $1, blog_description = $2, blog_link = $3 WHERE blog_id = $4 RETURNING *';
        const values = [args.input.blog_name, args.input.blog_description, args.input.blog_link, 8];

        await dbConnection
          .query(text, values)
          .then(res => {
            response = {
              blog_name: res[0].blog_name,
              blog_description: res[0].blog_description,
              blog_link: res[0].blog_link
            };
          })
          .catch(e => console.error('ERROR -->', e.stack));
        return response;
      }
    },
    deleteblog: {
      type: deleteBlog,
      args: { input: { type: deleteBlogInput } },
      resolve: async function(source, args) {
        let response;
        let needToDelete = false;
        const findBlogtext = 'SELECT * FROM blogs WHERE blog_id = $1';
        const findBlogvalue = [args.input.id];

        await dbConnection
          .query(findBlogtext, findBlogvalue)
          .then(res => {
            if (res.length) needToDelete = true;
          })
          .catch(e => console.error('ERROR -->', e.stack));

        if (!needToDelete) {
          return (response = {
            status: 400
          });
        }

        if (needToDelete) {
          const text = 'DELETE FROM blogs WHERE blog_id = $1';
          const values = [args.input.id];

          await dbConnection
            .query(text, values)
            .then(res => {
              response = {
                status: 200
              };
            })
            .catch(e => console.error('ERROR -->', e.stack));
          return response;
        }
        return;
      }
    }
  }
});

exports.portfolioMutations = portfolioMutations;

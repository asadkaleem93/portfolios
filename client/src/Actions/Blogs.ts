// lib
import axios from "axios";

// src
import { blogsFormInputsType } from "../Components/Portfolios/Bloggers/CreatePortfolio/Types";

const url = "http://localhost:3001/";
export const createBlogger = (values: blogsFormInputsType): Promise<any> => {
  const query = `mutation createblogger($input: createBloggersInput!) {
    createblogger(input: $input) {
      message
      portfolio_id
      blogs{
        blog_id
        blog_name
        blog_description
        blog_link
        blog_img 
      }
    }
  }`;

  const variables = {
    input: { ...values }
  };
  const options = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  return axios.post(`${url}api`, { query, variables }, options);
};

export const viewBlogs = (id: number): Promise<any> => {
  const query = `query {
    portfolioBlogs(input: ${id}) {
      message
      owner_info {
        owner_email
        owner_name
        owner_img
      }
      blogs {
        blog_id
        blog_name
        blog_description
        blog_link
        blog_img
      }
    }
  }`;
  const options = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  return axios.post(`${url}api`, { query }, options);
};

export const uploadImages = (file: any): Promise<any> => {
  const config = {
    headers: {
      "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s"
    }
  };
  console.log("FILE -->", file);

  return axios.post(`${url}uploadImages`, file, config);
};

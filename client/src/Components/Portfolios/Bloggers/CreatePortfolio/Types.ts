export interface formSections {
  id: string;
  name: string;
  descriptions: string;
  date: string;
  image: any;
}

export interface blogsType {
  blog_img: string;
  blog_description: string;
  blog_link: string;
  blog_name: string;
}

export interface blogsFormInputsType {
  owner_email: string;
  owner_img: string;
  owner_name: string;
  owner_password: string;
  blogs: blogsType[];
}

export interface ownerImgType {
  owner_img: string;
}

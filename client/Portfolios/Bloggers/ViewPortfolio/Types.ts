interface blogs {
  blog_id: number;
  blog_name: string;
  blog_description: string;
  blog_link: string;
  blog_img: string;
}
export interface ownerInfoType {
  owner_name: string | undefined;
  owner_img: string | undefined;
  owner_email: string | undefined;
}
export interface portfolioInfo {
  portfolioInfo: {
    owner_info?: ownerInfoType | undefined;
    message?: string | undefined;
    blogs?: blogs[] | undefined;
  };
}

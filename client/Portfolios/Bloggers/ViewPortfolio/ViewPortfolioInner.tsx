// lib
import * as React from "react";
import Card from "antd/lib/card";
import Meta from "antd/lib/card/Meta";

// src
import { portfolioInfo } from "./Types";

const portfolioInfoInner = (props: portfolioInfo) => {
  const { portfolioInfo } = props;
  const { owner_info, message, blogs } = portfolioInfo;
  console.log("PROPS -->", blogs);
  return (
    <div className="portfolio-view-wrapper">
      <div className="profile-container">Profile</div>
      <div className="blogs-container">
        {blogs &&
          blogs.map((blog: any) => (
            <Card
              key={blog.id}
              hoverable
              style={{ width: 300, margin: 20 }}
              cover={<img key={`image-${blog.id}`} alt="example" src={blog.blog_img || ""} />}>
              <Meta
                key={`meta-${blog.id}`}
                title={blog.blog_name || ""}
                description={blog.blog_description || ""}
              />
            </Card>
          ))}
      </div>
    </div>
  );
  //   <Card
  //     hoverable
  //     style={{ width: 240 }}
  //     cover={<img alt="example" src={owner_info ? owner_info.owner_img : ""} />}>
  //     <Meta title="Europe Street beat" description="www.instagram.com" />
  //   </Card>
  // );
};

export default portfolioInfoInner;

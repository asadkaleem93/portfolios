// lib
import * as React from "react";

// src
import CreatePortfolioInner from "./CreatePortfolioInner";
import "./CreatePortfolio.scss";
import { formSections, blogsFormInputsType, ownerImgType } from "./Types";
import { createBlogger } from "../../../../Actions/Blogs";

const CreatePortfolio = () => {
  const [blogSection, setBlogSection] = React.useState<formSections[]>([]);
  const [ownerImg, setOwnerImg] = React.useState<string>("");
  const blogSectionRef = React.useRef(null);

  const addBlogSection = () => {
    const totalSections = [
      ...blogSection,
      {
        id: `section-${blogSection.length + 1}`,
        name: "",
        descriptions: "",
        date: "",
        image: ""
      }
    ];
    setBlogSection(totalSections);
  };

  const onCreateBlogger = (values: blogsFormInputsType) => {
    createBlogger(values).then(resp => {
      if (resp.data.data.createblogger.blogs.length > 0)
        window.location.href = `http://localhost:3000/portfolio/${resp.data.data.createblogger.portfolio_id}`;
    });
  };

  const saveOwnerImgLink = (link: string) => setOwnerImg(link);
  const saveSectionImgLink = (sectionId: string, link: string) => {
    const specificBlogSection = blogSection.find(blog => blog.id === sectionId);
    if (specificBlogSection) {
      const withOutSelectedBlogSection = blogSection.filter(blog => blog.id !== sectionId);
      const changedImageLink = specificBlogSection && { ...specificBlogSection, image: link };
      setBlogSection([...withOutSelectedBlogSection, changedImageLink]);
    }
  };
  return (
    <CreatePortfolioInner
      onAddBlog={addBlogSection}
      onCreateBlogger={onCreateBlogger}
      blogSection={blogSection}
      blogSectionRef={blogSectionRef}
      onSaveOwnerImgLink={saveOwnerImgLink}
      ownerImg={ownerImg}
      onSaveSectionImgLink={saveSectionImgLink}
    />
  );
};

export default CreatePortfolio;

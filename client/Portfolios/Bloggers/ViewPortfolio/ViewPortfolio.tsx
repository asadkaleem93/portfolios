// lib
import * as React from "react";
import { withRouter } from "react-router-dom";

// src
import { viewBlogs } from "../../../../Actions/Blogs";
import ViewPortfolioInner from "./ViewPortfolioInner";
import { isObjEmpty } from "../../../Utils/helpers";
import "../../../../Assets/Scss/Blogs/ViewPortfolio.scss";

const ViewPortfolio = (props: any) => {
  const {
    match: {
      params: { id }
    }
  } = props;
  const [portfolioInfo, setPortfolioInfo] = React.useState({});
  React.useEffect(() => {
    viewBlogs(id).then(resp => setPortfolioInfo(resp.data.data.portfolioBlogs));
  }, []);
  return isObjEmpty(portfolioInfo) ? (
    <React.Fragment />
  ) : (
    <ViewPortfolioInner portfolioInfo={portfolioInfo} />
  );
};

export default withRouter(ViewPortfolio);

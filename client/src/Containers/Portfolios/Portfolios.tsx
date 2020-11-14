import * as React from "react";
import { useParams } from "react-router-dom";

import { Description } from "../Description/Description";
import { PortfoliosContent } from "../PortfoliosContent/PortfoliosContent";
import { Sidebar } from "../Sidebar/Sidebar";
import "./Portfolios.scss";

export const Portfolios = () => {
  const { portfolioId = "" } = useParams<{ portfolioId?: string }>();
  console.log("-->", portfolioId);
  return (
    <div className="portfoliosContainer">
      <Description />
      <div className="portfoliosDetail">
        <Sidebar />
        <PortfoliosContent />
      </div>
    </div>
  );
};

import * as React from "react";

import { useAppContext } from "../../Components/Contexts/AppContext";

import "./Description.scss";

export const Description = () => {
  const { state } = useAppContext();
  const { userInfo } = state;
  const { describeYourSelf } = userInfo;
  return <div className="portfoliosDescription">{describeYourSelf}</div>;
};

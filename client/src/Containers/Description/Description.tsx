import * as React from "react";

import { useAppContext } from "../../Components/Contexts/AppContext";

import "./Description.scss";

export const Description = () => {
  const { state } = useAppContext();
  const { userInfo } = state;
  const { describeYourSelf } = userInfo;
  return (
    <div className="portfoliosDescription" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/banner.png)` }}>
      {describeYourSelf}
    </div>
  );
};

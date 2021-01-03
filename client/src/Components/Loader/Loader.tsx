import * as React from "react";
import Spin from "antd/es/spin";

import "./Loader.scss";

export const Loader = () => {
  return (
    <div className="loaderMask">
      <Spin size="large" />
    </div>
  );
};

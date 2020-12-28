import * as React from "react";
import { Empty } from "antd/es";

import "./NotFound.scss";

export const NotFound = (props: { label?: string }) => {
  const { label = "No data found for this user" } = props;
  return (
    <div className="notFoundWrapper">
      <Empty description={label} />
    </div>
  );
};

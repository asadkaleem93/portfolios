import * as React from "react";

import "./AppHeading.scss";

export const AppHeading = (props: { text: string; style?: object }) => {
  const { text, style = {} } = props;
  return (
    <div className="appHeading" style={style}>
      {text}
    </div>
  );
};

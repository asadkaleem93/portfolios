import * as React from "react";
import { Image } from "antd/es";

import "./DisplayImage.scss";

export const DisplayImage = (props: { imgSrc?: string }) => {
  const { imgSrc } = props;
  return imgSrc ? (
    <div className="imageWrapper">
      <Image width={120} height={120} style={{ borderRadius: "25%" }} src={imgSrc} />
    </div>
  ) : (
    <img className="emptyImage" src={`${process.env.PUBLIC_URL}/empty-profile-picture.png`} width={120} height={120} style={{ borderRadius: "46.5%" }} />
  );
};

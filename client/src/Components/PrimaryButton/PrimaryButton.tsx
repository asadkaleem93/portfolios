import * as React from "react";
import { Button } from "antd/es";
import { ButtonProps } from "antd/es/button";

import "./PrimaryButton.scss";

type PrimaryButtonType = { label: string } & ButtonProps;

export const PrimaryButton = (props: PrimaryButtonType) => {
  const { label } = props;
  return <Button {...props}>{label}</Button>;
};

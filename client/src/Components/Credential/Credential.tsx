import * as React from "react";
import { JsxEmit } from "typescript";

import "./Credential.scss";

type CredentialType = {
  label: string;
  value: string | JSX.Element;
};

export const Credential = (props: CredentialType) => {
  const { label, value } = props;
  return (
    <div className="credential">
      <span>{label}:</span>
      <span>{value}</span>
    </div>
  );
};

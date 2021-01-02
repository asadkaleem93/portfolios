import * as React from "react";

import { FormikInputField } from "../FormikInputField/FormikInputField";

export const EmailPasswordFields = (props: { email?: string; password?: string }) => {
  const { email = "email", password = "password" } = props;
  return (
    <div style={{ marginTop: "35px" }}>
      <FormikInputField name={email} placeHolder="Email" fieldLabel="Email" />
      <FormikInputField name={password} placeHolder="Password" fieldLabel="Password" password />
    </div>
  );
};

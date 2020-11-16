import * as React from "react";
import Input, { InputProps } from "antd/es/input/Input";
import { useField } from "formik";

import "./FormikInputField.scss";

type InputFieldType = {
  placeHolder: string;
  name: string;
} & InputProps;

export const FormikInputField = (props: InputFieldType) => {
  const { placeHolder, name } = props;
  const [field] = useField(name);
  return (
    <div className="formikInputField">
      <Input {...field} placeholder={placeHolder} />
    </div>
  );
};

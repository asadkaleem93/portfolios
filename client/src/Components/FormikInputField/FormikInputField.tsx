import * as React from "react";
import { InputProps } from "antd/es/input/Input";
import { Tooltip, Input } from "antd/es";
import { useField } from "formik";

import "./FormikInputField.scss";

type InputFieldType = {
  placeHolder: string;
  name: string;
} & InputProps;

export const FormikInputField = (props: InputFieldType) => {
  const { name } = props;
  const [field, meta] = useField(name);
  const invalid = Boolean(meta.error && meta.touched);
  return (
    <Tooltip
      placement="right"
      title={`${invalid ? meta.error : ""}`}
      overlayClassName={[invalid ? "error-tooltip" : ""].join(" ")}
      transitionName=""
    >
      <div className="formikInputField">
        <Input
          {...field}
          {...props}
          className={invalid ? `invalid ${props.className}` : props.className}
        />
      </div>
    </Tooltip>
  );
};

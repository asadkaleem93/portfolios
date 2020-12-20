import * as React from "react";
import { InputProps } from "antd/es/input/Input";
import { Input, Tooltip } from "antd/es";
import { useField } from "formik";

import "./FormikTextArea.scss";

const { TextArea } = Input;

type InputFieldType = {
  placeHolder: string;
  name: string;
  rows?: number;
} & InputProps;

export const FormikTextAreaField = (props: InputFieldType) => {
  const { name, rows = 4 } = props;
  const [field, meta] = useField(name);
  const invalid = Boolean(meta.error && meta.touched);
  return (
    <Tooltip placement="right" title={`${invalid ? meta.error : ""}`} overlayClassName={[invalid ? "error-tooltip" : ""].join(" ")} transitionName="">
      <div className="formikTextAreaField">
        <TextArea rows={rows} {...field} className={invalid ? `invalid ${props.className}` : props.className} />
      </div>
    </Tooltip>
  );
};

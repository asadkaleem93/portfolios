import * as React from "react";
import { Radio } from "antd/es";
import { useField } from "formik";
import { RadioGroupProps } from "antd/es/radio";

import "./FormikRadioGroup.scss";

type RadioFieldType = { value: string; label: string };
type RadioGroupType = {
  fields: Array<RadioFieldType>;
} & RadioGroupProps;

export const FormikRadioGroup = (props: RadioGroupType) => {
  const { name = "fieldsGroup", fields } = props;
  const [field] = useField(name);
  return (
    <Radio.Group {...field} {...props}>
      {fields.map((field: RadioFieldType) => (
        <Radio value={field.value}>{field.label}</Radio>
      ))}
    </Radio.Group>
  );
};

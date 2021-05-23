import * as React from "react";
import { FormikInputField } from "../FormikInputField/FormikInputField";

import "./AddCardModal.scss";
import { FileUploader } from "../FileUploader/FileUploader";
import { PrimaryButton } from "../PrimaryButton/PrimaryButton";

type AddCardModalType = {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  index: number;
  arrayHelpers: any;
};

export const AddCardModal = (props: AddCardModalType) => {
  const { setFieldValue, index, arrayHelpers } = props;
  return (
    <div className="sectionContainer">
      <FormikInputField name={`cards[${index}].name`} placeHolder="Card Name" fieldLabel="Name" />
      <FormikInputField name={`cards[${index}].description`} placeHolder="Card Description" fieldLabel="Description" />
      <FormikInputField name={`cards[${index}].url`} placeHolder="Card Link" fieldLabel="External Link" />
      <div className="handlesContainer">
        <PrimaryButton onClick={() => arrayHelpers.remove(index)} label="Delete Card" />
        <FileUploader
          onUpload={(file: any) => {
            setFieldValue(`cards[${index}].image`, file);
          }}
          onDeleteFile={() => setFieldValue(`cards[${index}].image`, null)}
          fileType="img"
        />
      </div>
      <div className="modalSectionSeperator" />
    </div>
  );
};

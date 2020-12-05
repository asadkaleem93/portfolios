import * as React from "react";
import { FormikInputField } from "../FormikInputField/FormikInputField";

import "./AddCardModal.scss";
import { FileUploader } from "../FileUploader/FileUploader";

type AddCardModalType = {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  index: number;
};

export const AddCardModal = (props: AddCardModalType) => {
  const { setFieldValue, index } = props;
  return (
    <>
      <div className="sectionContainer">
        <FormikInputField
          name={`cards[${index}].name`}
          placeHolder="Card Name"
        />
        <FormikInputField
          name={`cards[${index}].description`}
          placeHolder="Card Description"
        />
        <FormikInputField
          name={`cards[${index}].link`}
          placeHolder="Card Link"
        />

        <FileUploader
          onUpload={(file: any) => {
            setFieldValue(`cards[${index}].image`, file);
          }}
          onDeleteFile={() => setFieldValue(`cards[${index}].image`, null)}
          fileType="img"
        />
      </div>
    </>
  );
};

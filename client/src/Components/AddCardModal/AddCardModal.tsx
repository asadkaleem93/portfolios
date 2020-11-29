import * as React from "react";
import { FormikInputField } from "../FormikInputField/FormikInputField";
import Upload from "antd/es/upload";
import Button from "antd/es/button";
import Icon from "antd/es/icon";

import "./AddCardModal.scss";

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
      </div>
      {/* <Upload
        name="logo"
        // action="http://localhost:3001/uploadImages"
        accept="image/*"
        customRequest={(options: any) => {
          const data = new FormData();
          setFieldValue("image", options.file);
          data.append("file", options.file);
          console.log("DATA -->", options);
          //   uploadImages(data)
          //     .then((res: any) => {
          //       console.log("RES -->", res);
          //     //   onSaveOwnerImgLink(res.data);
          //     //   options.onSuccess(res.data, options.file);
          //     })
          //     .catch((err: Error) => {
          //       console.log(err);
          //     });
        }}
        // onRemove={() => onSaveOwnerImgLink("")}
        listType="picture"
        onRemove={() => setFieldValue("image", {})}
      > 
        <Button>
          <Icon type="upload" /> Click to upload
        </Button>
      </Upload>*/}
    </>
  );
};

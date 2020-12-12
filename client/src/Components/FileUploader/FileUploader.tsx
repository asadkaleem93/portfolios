import React, { useRef, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";

import "./FileUploader.scss";
import { apiUrl } from "../../Utils/AppConstants";

type componentProps = {
  onUpload: (file: UploadedSignatureType) => void;
  onDeleteFile?: () => void;
  fileType?: "text" | "img";
  imgSrc?: string;
  resumeName?: string;
};

export interface UploadedSignatureType {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

export const FileUploader = (props: componentProps): JSX.Element => {
  const { onUpload, onDeleteFile = () => {}, fileType = "text", imgSrc = "", resumeName = "" } = props;
  const [file, setFile] = useState(imgSrc ? `http://localhost:3001${imgSrc}` : resumeName || "");
  const uploadFile = (uploadedFile: any): void => {
    if (uploadedFile && uploadedFile.type.includes("text/plain")) {
      setFile(uploadedFile.name);
      onUpload(uploadedFile);
    }
  };

  const uploadImg = (uploadedFile: any): void => {
    const fileReader = new FileReader();
    if (uploadedFile && uploadedFile.type && uploadedFile.type.includes("image")) {
      fileReader.readAsDataURL(uploadedFile);
      fileReader.onload = async (event: any): Promise<any> => {
        if (uploadedFile) {
          setFile(event.target.result);
          onUpload(uploadedFile);
        }
      };
    }
  };

  return (
    <div className="fileUploaderContainer">
      <div className="buttons-wrapper">
        <label className="custom-file-upload">
          <input
            type="file"
            key={file}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
              const file = e.target.files ? e.target.files[0] : {};
              if (file) fileType === "text" ? uploadFile(file) : uploadImg(file);
              else {
                onDeleteFile();
                setFile("");
              }
            }}
            accept={`${fileType === "text" ? "text/plain, application/pdf" : "image/*"}`}
          />
          <span className="attach-text">
            <span>Attach</span>
          </span>
        </label>
        {fileType === "img" && file.length ? (
          <span className="imgWrapper">
            <img width="40" height="40" src={file} />
          </span>
        ) : (
          <span>{file}</span>
        )}
        {file.length ? (
          <DeleteOutlined
            translate
            style={{
              marginLeft: "1rem",
            }}
            onClick={() => {
              setFile("");
              onDeleteFile();
            }}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

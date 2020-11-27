import React, { useRef, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";

import "./FileUploader.scss";

type componentProps = {
  onUpload: (file: UploadedSignatureType) => void;
  onDeleteFile?: () => void;
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
  const { onUpload, onDeleteFile = () => {} } = props;
  const [file, setFile] = useState("");
  const inputRef = useRef(null);
  // const [{ isLoading }, getImage] = useApi();
  //   useEffect(() => {
  //     if (imageType === "restricted" && url) {
  //       getImage(url, {
  //         responseType: "blob",
  //       }).then((response: any) => {
  //         setImage(URL.createObjectURL(new Blob([response])));
  //       });
  //     } else {
  //       setImage(url);
  //     }
  //   }, []);
  const onUploadFile = (e: any): void => {
    // const fileReader = new FileReader();
    const uploadedFile = e.target.files;
    if (uploadedFile[0] && uploadedFile[0].type.includes("text/plain")) {
      setFile(uploadedFile[0].name);
      onUpload(uploadedFile[0]);
      //   fileReader.readAsDataURL(uploadedFile[0]);
      //   fileReader.onload = async (event: any): Promise<any> => {
      //     console.log("event -->", event);
      //     if (onUpload) {
      //       setFile(event.target.result);
      //     }
      //   };
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
              if (file) onUploadFile(e);
              else {
                onDeleteFile();
                setFile("");
              }
            }}
            ref={inputRef}
            accept="text/plain, application/pdf"
          />
          <span className="attach-text">
            <span>Attach</span>
          </span>
        </label>
        <span>{file}</span>
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

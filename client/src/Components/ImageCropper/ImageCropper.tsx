import * as React from "react";
import { CloseCircleOutlined } from "@ant-design/icons";
import Cropper from "react-easy-crop";

export const ImageCropper = (props: { cropperVisibility: boolean; onCloseCropper: () => void; imgsrc: string; onCropComplete: (croppedAreaPixels) => void }) => {
  const { cropperVisibility, onCloseCropper, imgsrc, onCropComplete } = props;
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  if (cropperVisibility)
    return (
      <>
        <Cropper
          style={{
            containerStyle: {
              zIndex: 1010,
            },
          }}
          image={imgsrc}
          crop={crop}
          cropSize={{ width: 400, height: 400 }}
          onCropChange={setCrop}
          onCropComplete={(_, croppedAreaPixels) => onCropComplete(JSON.stringify(croppedAreaPixels))}
        />
        <CloseCircleOutlined
          translate
          style={{
            fontSize: 30,
            zIndex: 1020,
            position: "absolute",
            color: "white",
            top: 10,
            left: 10,
          }}
          onClick={onCloseCropper}
        />
      </>
    );
  return null;
};

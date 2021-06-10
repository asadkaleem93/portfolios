import * as React from "react";
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
              position: "absolute",
            },
          }}
          image={imgsrc}
          crop={crop}
          cropSize={{ width: 400, height: 400 }}
          onCropChange={setCrop}
          onCropComplete={(_, croppedAreaPixels) => onCropComplete(JSON.stringify(croppedAreaPixels))}
        />
        <h1
          style={{
            fontSize: 20,
            zIndex: 1020,
            position: "absolute",
            color: "white",
            top: 10,
            left: 10,
          }}
          onClick={onCloseCropper}
        >
          Save
        </h1>
      </>
    );
  return null;
};

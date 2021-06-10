import * as React from "react";

import "./DisplayImage.scss";
import { CloseCircleOutlined } from "@ant-design/icons";
import { apiUrl } from "../../Utils/AppConstants";

export const DisplayImage = (props: { imgSrc?: string; actualImage?: string }) => {
  const { imgSrc = "", actualImage = "" } = props;
  const [state, setState] = React.useState<{ fullImageVisibility: boolean }>({
    fullImageVisibility: false,
  });
  const imgBEUrl = apiUrl.substring(0, apiUrl.length - 1);

  if (imgSrc)
    return (
      <>
        {!state.fullImageVisibility ? (
          <div className="imageWrapper">
            <img width={120} height={120} style={{ borderRadius: "50%" }} src={imgSrc} onClick={() => setState({ ...state, fullImageVisibility: true })} />
          </div>
        ) : (
          <>
            <div className="imageWrapper">
              <img width={120} height={120} style={{ borderRadius: "50%" }} src={imgSrc} onClick={() => setState({ ...state, fullImageVisibility: true })} />
            </div>
            <div className="ant-image-preview-root">
              <div className="ant-image-preview-wrap" role="dialog" style={{ backgroundColor: "rgba(0,0,0, 0.5)", width: "100%", height: "100%" }}>
                <div className="ant-image-preview">
                  <div className="ant-image-preview-content">
                    <CloseCircleOutlined
                      translate
                      style={{
                        right: ".5rem",
                        top: ".5rem",
                        position: "absolute",
                        fontSize: 30,
                        color: "white",
                        zIndex: 1081,
                      }}
                      onClick={() => {
                        setState({ ...state, fullImageVisibility: false });
                      }}
                    />
                    <div className="ant-image-preview-body">
                      <div className="ant-image-preview-img-wrapper" style={{ transform: "translate3d(0px, 0px, 0px)," }}>
                        <img className="ant-image-preview-img" src={`${imgBEUrl}${actualImage}`} style={{ transform: "scale3d(1, 1, 1) rotate(0deg)" }} />
                      </div>
                    </div>
                  </div>
                  <div aria-hidden="true"></div>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  return <img className="emptyImage" src={`${process.env.PUBLIC_URL}/empty-profile-picture.png`} width={120} height={120} style={{ borderRadius: "46.5%" }} />;
};

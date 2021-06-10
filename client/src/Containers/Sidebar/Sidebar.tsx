import * as React from "react";
import { MenuUnfoldOutlined, LinkedinOutlined, GithubOutlined } from "@ant-design/icons";

import { Credential } from "../../Components/Credential/Credential";
import { TagSection } from "../../Components/TagSection/TagSection";
import { useAppContext } from "../../Components/Contexts/AppContext";
import { DisplayImage } from "../../Components/DisplayImage/DisplayImage";
import { OverlayDrawer } from "../../Components/OverlayDrawer/OverlayDrawer";
import { ApplicationDrawertoggleOutside, ApplicationDrawertoggleInside } from "../../Assets/SvgIcons";
import { getCroppedImg, blobToBase64 } from "../../Utils/helpers";

import "./Sidebar.scss";
import { PrimaryButton } from "../../Components/PrimaryButton/PrimaryButton";
import { apiUrl } from "../../Utils/AppConstants";

export const Sidebar = (props: { userName: string }) => {
  const { state: appState } = useAppContext();
  const [state, setState] = React.useState<{ drawerVisibility: boolean; imgSrc: string }>({
    drawerVisibility: false,
    imgSrc: "",
  });
  const { userInfo } = appState;
  const { phoneNumber, email, degree, university, gpaScore, skills, interest, resume = "", displayImage = "", linkedIn = "", github = "", cropValues = "" } = userInfo;
  const formatedSkills = skills ? skills.split(",") : [];
  const formatedInterests = interest ? interest.split(",") : [];
  const BEUrl = apiUrl.substring(0, apiUrl.length - 1);
  React.useEffect(() => {
    const croppedImage = async () => {
      const file = await getCroppedImg(`${BEUrl}${displayImage}`, JSON.parse(cropValues));
      blobToBase64(file).then((res: any) => {
        setState({ ...state, imgSrc: res });
      });
    };
    if (displayImage.length) croppedImage();
    else setState({ ...state, imgSrc: "" });
  }, [displayImage]);

  const ExpandDrawerMarkup = () => {
    return (
      <>
        <div className="portfoliosSideBar">
          <DisplayImage imgSrc={state.imgSrc} actualImage={displayImage} />
          {userInfo.resume && userInfo.resume.length && (
            <a className="downloadAnchor" href={`${BEUrl}${userInfo.resume}`} download>
              <PrimaryButton onClick={() => {}} label="Download Resume" style={{ width: "100%" }} />
            </a>
          )}
          <Credential label="Phone number" value={phoneNumber} />
          <Credential label="Email" value={email} />
          {degree && <Credential label="Degree" value={degree} />}
          {university && <Credential label="University" value={university} />}
          {gpaScore && <Credential label="GPA" value={gpaScore} />}
          {formatedSkills.length ? <Credential label="Skills" value={<TagSection tags={formatedSkills} />} /> : <></>}
          {formatedInterests.length ? <Credential label="Interest" value={<TagSection tags={formatedInterests} />} /> : <></>}
          <div style={{ display: "flex", marginTop: ".5rem" }}>
            {linkedIn && (
              <a href={linkedIn} target="_blank">
                <LinkedinOutlined translate style={{ color: "#0077b5", fontSize: 25, marginRight: ".75rem" }} />
              </a>
            )}
            {github && (
              <a href={github} target="_blank">
                <GithubOutlined translate style={{ color: "black", fontSize: 25 }} />
              </a>
            )}
          </div>
        </div>
      </>
    );
  };
  const CollapsedDrawerMarkup = () => {
    return (
      <div className="collapsedDrawrWrapper">
        <MenuUnfoldOutlined style={{ fontSize: 30 }} translate onClick={() => setState({ ...state, drawerVisibility: !state.drawerVisibility })} />
      </div>
    );
  };

  return (
    <>
      <div className="drawerHandle" onClick={() => setState({ ...state, drawerVisibility: !state.drawerVisibility })} style={{ left: `${state.drawerVisibility ? "256px" : "0px"}`, transition: "all 0.3s", zIndex: 1000, position: "absolute" }}>
        {state.drawerVisibility ? <ApplicationDrawertoggleInside /> : <ApplicationDrawertoggleOutside />}
      </div>
      <OverlayDrawer
        isOpen={state.drawerVisibility}
        handleClose={() => setState({ ...state, drawerVisibility: !state.drawerVisibility })}
        expandDrawerContent={<ExpandDrawerMarkup />}
        collapsedDrawerContent={<CollapsedDrawerMarkup />}
        completeCollapse
        closeButton
        header={{ visibility: false, value: "" }}
        zIndex={1000}
      />
    </>
  );
};

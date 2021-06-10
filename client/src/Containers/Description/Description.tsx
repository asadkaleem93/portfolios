import * as React from "react";

import { useAppContext } from "../../Components/Contexts/AppContext";

import "./Description.scss";
import { ApplicationBannerDragDown, ApplicationBannerDragUp } from "../../Assets/SvgIcons";

export const Description = () => {
  const { state } = useAppContext();
  const { userInfo } = state;
  const { describeYourSelf } = userInfo;
  const [componentState, setState] = React.useState<{ bannerVisibility: boolean }>({ bannerVisibility: false });
  const { bannerVisibility } = componentState;
  const bannerStyle = {
    height: bannerVisibility ? "30%" : 0,
    padding: bannerVisibility ? "1rem 3rem" : 0,
  };
  return (
    <>
      <div className="portfoliosDescription" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/absctractBanner.jpg)`, ...bannerStyle }}>
        {bannerVisibility && describeYourSelf}
      </div>
      {!bannerVisibility ? (
        <div className="descriptionDrawerWrapper" onClick={() => setState({ ...state, bannerVisibility: true })}>
          <ApplicationBannerDragDown />
        </div>
      ) : (
        <div className="descriptionDrawerWrapper" onClick={() => setState({ ...state, bannerVisibility: false })}>
          <ApplicationBannerDragUp />
        </div>
      )}
    </>
  );
};

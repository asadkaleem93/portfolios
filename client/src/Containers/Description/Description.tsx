import * as React from "react";
import { VerticalAlignBottomOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";

import { useAppContext } from "../../Components/Contexts/AppContext";

import "./Description.scss";

export const Description = () => {
  const { state } = useAppContext();
  const { userInfo } = state;
  const { describeYourSelf } = userInfo;
  const [componentState, setState] = React.useState<{ bannerVisibility: boolean }>({ bannerVisibility: false });
  const { bannerVisibility } = componentState;
  const bannerStyle = {
    height: bannerVisibility ? "25%" : 0,
    padding: bannerVisibility ? "1rem 3rem" : 0,
  };
  return (
    <>
      {/* {bannerVisibility && ( */}
      <div className="portfoliosDescription" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/banner.png)`, ...bannerStyle }}>
        {bannerVisibility && describeYourSelf}
      </div>
      {/* )} */}
      <div className="descriptionDrawerWrapper">
        {!bannerVisibility ? (
          <VerticalAlignBottomOutlined
            style={{
              fontSize: "30px",
            }}
            translate
            onClick={() => setState({ ...componentState, bannerVisibility: !bannerVisibility })}
          />
        ) : (
          <VerticalAlignTopOutlined
            style={{
              fontSize: "30px",
            }}
            translate
            onClick={() => setState({ ...componentState, bannerVisibility: !bannerVisibility })}
          />
        )}
      </div>
    </>
  );
};

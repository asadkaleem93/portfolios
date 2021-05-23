import * as React from "react";
import { useParams, useHistory } from "react-router-dom";

import { Description } from "../Description/Description";
import { PortfoliosContent } from "../PortfoliosContent/PortfoliosContent";
import { Sidebar } from "../Sidebar/Sidebar";
import { Loader } from "../../Components/Loader/Loader";
import { useAppContext } from "../../Components/Contexts/AppContext";
import { getCompleteUserInfo } from "../../Actions/usersActions";
import "./Portfolios.scss";

export const Portfolios = () => {
  const { userName: navUserName = "" } = useParams<{ userName?: string }>();
  const { state, dispatcher } = useAppContext();
  const { appLoader, portfolioCards, userInfo } = state;
  const history = useHistory();
  const notFoundRedirect = () => {
    history.push("/notfound");
  };

  // React.useEffect(() => {
  //   getCompleteUserInfo({
  //     userName: navUserName,
  //     dispatch: dispatcher,
  //     notFoundRedirect: notFoundRedirect,
  //   });
  // }, [navUserName]);

  if (Object.keys(userInfo).length === 0 && portfolioCards.length === 0) return null;

  return (
    <>
      {appLoader && <Loader />}
      <div className="portfoliosContainer">
        <Sidebar userName={navUserName} />
        <div className="portfoliosDetail">
          <Description />
          <PortfoliosContent userName={navUserName} />
        </div>
      </div>
    </>
  );
};

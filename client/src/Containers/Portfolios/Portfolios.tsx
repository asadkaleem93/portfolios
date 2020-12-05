import * as React from "react";
import { useParams } from "react-router-dom";

import { Description } from "../Description/Description";
import { PortfoliosContent } from "../PortfoliosContent/PortfoliosContent";
import { Sidebar } from "../Sidebar/Sidebar";
import { Loader } from "../../Components/Loader/Loader";
import { useAppContext } from "../../Components/Contexts/AppContext";
import { getCompleteUserInfo } from "../../Actions/portfolios";
import "./Portfolios.scss";

export const Portfolios = () => {
  const { userName: navUserName = "" } = useParams<{ userName?: string }>();
  const [state, setState] = React.useState<{
    isLoading: boolean;
    error: string;
  }>({
    isLoading: true,
    error: "",
  });

  const { isLoading, error } = state;
  const { state: appState, dispatcher } = useAppContext();
  React.useEffect(() => {
    if (navUserName) {
      getCompleteUserInfo({
        userName: navUserName,
        dispatch: dispatcher,
      });
      setState({ ...state, isLoading: false });
    } else {
      setState({ ...state, isLoading: false, error: "No data for this user" });
    }
  }, [navUserName]);

  if (isLoading) return <Loader />;
  if (error.length > 0) return <div>{state.error}</div>;

  return (
    <div className="portfoliosContainer">
      <Description />
      <div className="portfoliosDetail">
        <Sidebar />
        <PortfoliosContent userName={navUserName} />
      </div>
    </div>
  );
};

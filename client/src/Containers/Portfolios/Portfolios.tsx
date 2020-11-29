import * as React from "react";
import { useParams } from "react-router-dom";

import { Description } from "../Description/Description";
import { PortfoliosContent } from "../PortfoliosContent/PortfoliosContent";
import { Sidebar } from "../Sidebar/Sidebar";
import { Loader } from "../../Components/Loader/Loader";
import { useAppContext } from "../../Components/Contexts/AppContext";
import { getPortfolioInfo } from "../../Actions/portfolios";
import "./Portfolios.scss";

export const Portfolios = () => {
  const { userName = "" } = useParams<{ userName?: string }>();
  const [state, setState] = React.useState<{
    isLoading: boolean;
    error: string;
  }>({
    isLoading: true,
    error: "",
  });

  const { isLoading, error } = state;
  const { state: appState, dispatcher } = useAppContext();
  const { portfolioCards, userInfo } = appState;
  console.log("appState -->", appState);
  React.useEffect(() => {
    if (userInfo.userName) {
      getPortfolioInfo({
        userName: userName,
        dispatch: dispatcher,
      }).then((res) => {
        console.log("INNER res", res);
        // if (res === "Cards received")
        //   setState({
        //     ...state,
        //     isLoading: false,
        //   });
        // else
        //   setState({
        //     ...state,
        //     error: res,
        //     isLoading: false,
        //   });
      });
      setState({ ...state, isLoading: false });
    } else {
      setState({ ...state, isLoading: false });
    }
  }, [userName]);

  if (isLoading) return <Loader />;
  if (error.length > 0) return <div>Error occured</div>;

  return (
    <div className="portfoliosContainer">
      <Description />
      <div className="portfoliosDetail">
        <Sidebar />
        <PortfoliosContent />
      </div>
    </div>
  );
};

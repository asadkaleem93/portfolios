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
  const { portfolioId = "" } = useParams<{ portfolioId?: string }>();
  const [state, setState] = React.useState<{
    isLoading: boolean;
    error: string;
  }>({
    isLoading: true,
    error: "",
  });

  const { isLoading, error } = state;
  const { state: appState, dispatcher } = useAppContext();
  const { portfolioCards } = appState;

  React.useEffect(() => {
    if (portfolioId) {
      getPortfolioInfo({
        userName: portfolioId,
        dispatch: dispatcher,
      }).then((res) => {
        if (res === "Cards received")
          setState({
            ...state,
            isLoading: false,
          });
        else
          setState({
            ...state,
            error: res,
            isLoading: false,
          });
      });
    }
  }, [portfolioId]);

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

import * as React from "react";
import { useAppContext } from "../../Components/Contexts/AppContext";
import { NotFound } from "../../Components/NotFound/NotFound";
import { PortfolioCard } from "../../Components/PortfolioCard/PortfolioCard";
import { PortfolioCardType } from "../../Utils/Types";
import { PortfoliosContentHeader } from "../PortfoliosContentHeader/PortfoliosContentHeader";

import "./PortfoliosContent.scss";

export const PortfoliosContent = (props: { userName: string }) => {
  const { state: appState, dispatcher } = useAppContext();
  const { userName } = props;
  const { portfolioCards } = appState;
  const [state, setState] = React.useState({
    searchedString: "",
  });
  const { searchedString } = state;

  const onCardSearch = (string: string) => {
    setState({
      ...state,
      searchedString: string,
    });
  };

  // const updatedCards = portfolioCards.filter((card: PortfolioCardType) => card.name.includes(searchedString));
  const updatedCards = [];

  return (
    <div className="portfoliosContent">
      <div className="portfoliosContentHeader">
        <PortfoliosContentHeader onCardSearch={onCardSearch} userName={userName} />
      </div>
      {updatedCards.length ? (
        <div className="cards">
          {updatedCards.map((card: PortfolioCardType) =>
            card.url.length ? (
              // <a href={card.url} target="_blank">
              <PortfolioCard card={card} dispatcher={dispatcher} />
            ) : (
              // </a>
              <PortfolioCard card={card} dispatcher={dispatcher} />
            ),
          )}
        </div>
      ) : (
        <NotFound label="Add cards in your portoflio" />
      )}
    </div>
  );
};

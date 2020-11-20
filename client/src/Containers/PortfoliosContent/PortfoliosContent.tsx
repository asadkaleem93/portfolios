import * as React from "react";
import { useAppContext } from "../../Components/Contexts/AppContext";
import { PortfolioCard } from "../../Components/PortfolioCard/PortfolioCard";
import { PortfolioCardType } from "../../Utils/Types";
import { PortfoliosContentHeader } from "../PortfoliosContentHeader/PortfoliosContentHeader";

import "./PortfoliosContent.scss";

export const PortfoliosContent = () => {
  const { state: appState } = useAppContext();
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

  const updatedCards = portfolioCards.filter((card: PortfolioCardType) =>
    card.name.includes(searchedString),
  );

  return (
    <div className="portfoliosContent">
      <div className="portfoliosContentHeader">
        <PortfoliosContentHeader onCardSearch={onCardSearch} />
      </div>
      <div className="cards">
        {updatedCards.map((card: PortfolioCardType) => (
          // ADD LINK CHECK
          <a href={card.url} target="_blank">
            <PortfolioCard title={card.name} description={card.description} />
          </a>
        ))}
      </div>
    </div>
  );
};

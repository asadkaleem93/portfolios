import * as React from "react";
import { PortfolioCard } from "../../Components/PortfolioCard/PortfolioCard";
import { PortfoliosContentHeader } from "../../Components/PortfoliosContentHeader/PortfoliosContentHeader";

import "./PortfoliosContent.scss";

type CardType = {
  title: string;
  description: string;
  link: string;
};

const cards: Array<CardType> = [
  {
    title: "Card 1",
    description:
      "This is a clickable First card description, Loream ipsum Loream ipsum Loream ipsum  Loream ipsum vLoream ipsum",
    link: "https://google.com",
  },
  {
    title: "Card 2",
    description:
      "This is a clickable First card description, Loream ipsum Loream ipsum Loream ipsum  Loream ipsum vLoream ipsum",
    link: "https://google.com",
  },
  {
    title: "Card 3",
    description:
      "This is a clickable First card description, Loream ipsum Loream ipsum Loream ipsum  Loream ipsum vLoream ipsum",
    link: "https://google.com",
  },
  {
    title: "Card 5",
    description:
      "This is a clickable First card description, Loream ipsum Loream ipsum Loream ipsum  Loream ipsum vLoream ipsum",
    link: "https://google.com",
  },
  {
    title: "Card 6",
    description:
      "This is a clickable First card description, Loream ipsum Loream ipsum Loream ipsum  Loream ipsum vLoream ipsum",
    link: "https://google.com",
  },
  {
    title: "Card 7",
    description:
      "This is a clickable First card description, Loream ipsum Loream ipsum Loream ipsum  Loream ipsum vLoream ipsum",
    link: "https://google.com",
  },
  {
    title: "Card 8",
    description:
      "This is a clickable First card description, Loream ipsum Loream ipsum Loream ipsum  Loream ipsum vLoream ipsum",
    link: "https://google.com",
  },
  {
    title: "Card 9",
    description:
      "This is a clickable First card description, Loream ipsum Loream ipsum Loream ipsum  Loream ipsum vLoream ipsum",
    link: "https://google.com",
  },
  {
    title: "Card 10",
    description:
      "This is a clickable First card description, Loream ipsum Loream ipsum Loream ipsum  Loream ipsum vLoream ipsum",
    link: "https://google.com",
  },
  {
    title: "Card 11",
    description:
      "This is a clickable First card description, Loream ipsum Loream ipsum Loream ipsum  Loream ipsum vLoream ipsum",
    link: "https://google.com",
  },
  {
    title: "Card 12",
    description:
      "This is a clickable First card description, Loream ipsum Loream ipsum Loream ipsum  Loream ipsum vLoream ipsum",
    link: "https://google.com",
  },
  {
    title: "Card 13",
    description:
      "This is a clickable First card description, Loream ipsum Loream ipsum Loream ipsum  Loream ipsum vLoream ipsum",
    link: "https://google.com",
  },
];

export const PortfoliosContent = () => {
  const [state, setState] = React.useState({
    searchedString: "",
  });
  const { searchedString } = state;

  const onCardSearch = (string: string) => {
    console.log("string -->", string);
    setState({
      ...state,
      searchedString: string,
    });
  };

  const updatedCards = cards.filter((card: CardType) =>
    card.title.includes(searchedString),
  );

  return (
    <div className="portfoliosContent">
      <div className="portfoliosContentHeader">
        <PortfoliosContentHeader onCardSearch={onCardSearch} />
      </div>
      <div className="cards">
        {updatedCards.map((card: CardType) => (
          <a href={card.link} target="_blank">
            <PortfolioCard title={card.title} description={card.description} />
          </a>
        ))}
      </div>
    </div>
  );
};

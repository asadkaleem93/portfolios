import * as React from "react";

import { PortfolioCardType, UserFieldsType } from "../../Utils/Types";
import { PortfolioCard } from "../PortfolioCard/PortfolioCard";

export const SET_PORTFOLIO_CARDS = "SET_PORTFOLIO_CARDS";
export const DELETE_PORTFOLIO_CARD = "DELETE_PORTFOLIO_CARD";
export const UPDATE_PORTFOLIO_CARD = "UPDATE_PORTFOLIO_CARD";
export const SET_USER_INFO = "SET_USER_INFO";

type AppStateType = ({} & PortfolioCardType & UserFieldsType) | any;

type AppContextType = {
  state: AppStateType;
  dispatcher: any;
};

const defaultAppState: AppStateType = {
  portfolioCards: [],
  userInfo: {},
};

const appContextReducer = (state, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return { ...state, ...action.payload };
    case SET_PORTFOLIO_CARDS:
      return { ...state, portfolioCards: [...state.portfolioCards, ...action.payload] };
    case DELETE_PORTFOLIO_CARD:
      return { ...state, portfolioCards: state.portfolioCards.filter((card: PortfolioCardType) => card.id !== action.payload) };
    case UPDATE_PORTFOLIO_CARD:
      return {
        ...state,
        portfolioCards: state.portfolioCards.map((card: PortfolioCardType) => {
          if (card.id === action.payload.id) return action.payload;
          else return card;
        }),
      };
    default:
      return state;
  }
};

export const AppContext = React.createContext<Partial<AppContextType>>({
  state: defaultAppState,
});

export const useAppContext = () => React.useContext(AppContext);

export const AppContextProvider = (props: { children: any }) => {
  const { children } = props;
  const [state, dispatcher] = React.useReducer(appContextReducer, defaultAppState);
  const value = {
    state,
    dispatcher,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

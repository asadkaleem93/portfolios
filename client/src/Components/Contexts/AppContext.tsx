import * as React from "react";

import { PortfolioCardType } from "../../Utils/Types";

export const SET_PORTFOLIO_CARDS = "SET_PORTFOLIO_CARDS";

type AppStateType = ({} & PortfolioCardType) | any;

type AppContextType = {
  state: AppStateType;
  dispatcher: any;
};

const defaultAppState: AppStateType = {
  portfolioCards: [],
};

const appContextReducer = (state, action) => {
  switch (action.type) {
    case SET_PORTFOLIO_CARDS:
      return { ...state, ...action.payload };
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
  const [state, dispatcher] = React.useReducer(
    appContextReducer,
    defaultAppState,
  );
  const value = {
    state,
    dispatcher,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

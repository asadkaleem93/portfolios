// lib
import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Portfolios } from "../Containers/Portfolios/Portfolios";
import { SignIn } from "../Containers/SignIn/SignIn";
import { AppContextProvider } from "./Contexts/AppContext";

// constants
// const { Content } = Layout;

/**
 * Root Compomnent of the Application
 *
 * @class App
 * @extends {React.Component<IProps, IState>}
 */
const App = () => {
  return (
    <Router>
      <React.Fragment>
        <AppContextProvider>
          <div className="portfolios-wrapper">
            {/* <Header /> */}
            <div className="mainContent">
              <Route exact={true} path="/" component={SignIn} />
              <Route exact={true} path="/:portfolioId" component={Portfolios} />
            </div>
            {/* <Footer /> */}
          </div>
        </AppContextProvider>
      </React.Fragment>
    </Router>
  );
};

export default App;

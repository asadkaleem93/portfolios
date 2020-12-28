// lib
import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Portfolios } from "../Containers/Portfolios/Portfolios";
import { SignInContainer } from "../Containers/SignIn/SignInContainer";
import { AppContextProvider } from "./Contexts/AppContext";
import { NotFound } from "./NotFound/NotFound";

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
              <Route exact={true} path="/" component={SignInContainer} />
              <Route exact={true} path="/notfound" component={NotFound} />
              <Route exact={true} path="/portfolio/:userName" component={Portfolios} />
            </div>
            {/* <Footer /> */}
          </div>
        </AppContextProvider>
      </React.Fragment>
    </Router>
  );
};

export default App;

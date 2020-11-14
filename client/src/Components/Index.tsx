// lib
import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import Layout from 'antd/lib/layout';

//src
import Header from "./Header";
import Footer from "./Footer/Index";
import CreatePortfolios from "./Portfolios/Bloggers/CreatePortfolio/Index";
import ViewPortfolio from "./Portfolios/Bloggers/ViewPortfolio/Index";
import { Portfolios } from "../Containers/Portfolios/Portfolios";
// import './index.css';

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
        <div className="portfolios-wrapper">
          {/* <Header /> */}
          <div className="mainContent">
            <Route
              exact={true}
              path="/blogs/create"
              component={CreatePortfolios}
            />
            <Route
              exact={true}
              path="/portfolio/:id"
              component={ViewPortfolio}
            />
            <Route exact={true} path="/:portfolioId" component={Portfolios} />
          </div>
          {/* <Footer /> */}
        </div>
      </React.Fragment>
    </Router>
  );
};

export default App;

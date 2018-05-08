import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Notifications from "react-notify-toast";

import Header from "./header";
import NavBar from "./nav_bar";
import TransactionList from "./transaction_list";
import DataImporter from "./data_importer";

export default class App extends Component {
  render() {
    return (
      <div className="app-container">
        <Header />
        <div className="main-container clearfix">
          <NavBar />
          <div className="content-container">
            <Switch>
              <Route exact path="/" component={TransactionList} />
              <Route path="/import" component={DataImporter} />} />
            </Switch>
          </div>
        </div>
        <Notifications />
      </div>
    );
  }
}

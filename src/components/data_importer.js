import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import DataParser from "./data_parser";
import DataMapper from "./data_mapper";
import DataReviewer from "./data_reviewer";

class DataImporter extends Component {
  render() {
    return (
      <div className="data-importer-container">
        <Switch>
          <Route path="/import/paste" component={DataParser} />
          <Route path="/import/mapping" component={DataMapper} />
          <Route path="/import/review" component={DataReviewer} />
        </Switch>
      </div>
    );
  }
}

export default DataImporter;

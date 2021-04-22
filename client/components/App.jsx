import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ArticlesArea from "./ArticlesArea";

class App extends Component {
  render() {
    return (
      // <div>
      //   <h3>Data goes here...</h3>
      //   {/* <ArticlesArea /> */}
      // </div>
      <Router>
        <div className="router">
          <main>
            <Switch>
              <Route exact path="/" component={ArticlesArea} />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;

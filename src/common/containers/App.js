import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import routes from "../routes";

if (process.env.WEBPACK) {
  require ('./App.scss');
}

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Switch>
          {routes.map((route, i) => <Route key={i} {...route} />)}
        </Switch>
      </div>
    );
  }
}

export default App;
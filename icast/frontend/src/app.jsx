import React, { Component, Fragment } from "react";
import { Switch, Route } from "react-router-dom";
//-- frontend components --
import NavMenu from "./components/nav_menu";
import HomeView from "./contents/home_view";
import FeaturesView from "./contents/features_view";
import SubscribeView from "./subscription/subscribe_view";


class App extends Component {
  // componentDidMount() {
  // }

  render() {
    return (
      <div className="app-root">
        <div className="app-container">
          <div className="nav-menu">
            <NavMenu />
          </div>
          <Switch>
            {/* <Route exact path="/" component={HomeView} /> */}
            <Route exact path="/home" component={HomeView} />
            <Route exact path="/features" component={FeaturesView} />
            <Route exact path="/Subscribe" component={SubscribeView} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;

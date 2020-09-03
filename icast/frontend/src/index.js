import "core-js";
import "./css/app.scss";
import "./css/subscription.scss";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
// import registerServiceWorker from "./registerServiceWorker";
import App from "./app";
import ConstructionView from "./contents/construction_view";

const urlpath = window.location.pathname;

ReactDOM.render(
  <>
    {(urlpath == "/" || urlpath == "") ?
      <ConstructionView />
    : (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )}
   </>,
  document.getElementById("app")
);
// registerServiceWorker();

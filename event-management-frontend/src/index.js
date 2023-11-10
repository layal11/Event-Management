import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./store/index";
import { Provider } from "react-redux";
import history from "./History";

import { BrowserRouter, Router } from "react-router-dom";
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

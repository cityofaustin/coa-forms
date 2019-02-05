import React from "react";
import ReactDOM from "react-dom";
import { Router, useRouterHistory } from "react-router";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { createHistory } from "history";

import "us-forms-system/lib/css/styles.css";
import "./css/overrides.scss";

import route from "./js/routes.jsx";
import reducer from "./js/reducers";

import thunk from 'redux-thunk';

const store = createStore(combineReducers(reducer), applyMiddleware(thunk));

const browserHistory = useRouterHistory(createHistory)({
  basename: ""
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>{route}</Router>
  </Provider>,
  document.getElementById("root")
);

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, useRouterHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createHistory } from 'history';

import 'us-forms-system/lib/css/styles.css';
import './css/overrides.scss';

import route from './js/routes.jsx';
import reducer from './js/reducers';

import thunk from 'redux-thunk';

const store = createStore(combineReducers(reducer), applyMiddleware(thunk));

const browserHistory = useRouterHistory(createHistory)({
  basename: '',
});

ReactDOM.render(
  <div>
    <header className="schemaform-block-header site-header" role="banner">
      <div className="usa-nav-container form-nav">
        <nav className="language-nav">
          <a className="active language" href="/police-thank/">
            English
          </a>
          <a href="/policia-agradezca/" className="second">
            Español
          </a>
        </nav>
        <nav className="site-nav">City of Austin</nav>
      </div>
    </header>
    <Provider store={store}>
      <Router history={browserHistory}>{route}</Router>
    </Provider>
  </div>,
  document.getElementById('root'),
);

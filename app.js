import React from 'react';
import ReactDOM from 'react-dom';
import { Router, useRouterHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createHistory } from 'history';

import 'us-forms-system/lib/css/styles.css';
import './css/overrides.scss';

import Modalbox from './js/components/Modalbox'

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
          <a className="active language" href="/police-complain/">
            English
          </a>
          <a href="/policia-queja/" className="second">
            Español
          </a>
        </nav>
        <nav className="site-nav">City of Austin</nav>
      </div>
    </header>
    <Provider store={store}>
      <Router history={browserHistory}>{route}</Router>
    </Provider>
    <Modalbox/>
  </div>,
  document.getElementById('root'),
);

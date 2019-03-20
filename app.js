import React from 'react';
import ReactDOM from 'react-dom';
import { Router, useRouterHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createHistory } from 'history';

import 'us-forms-system/lib/css/styles.css';
import './css/overrides.scss';

import Modalbox from './js/components/Modalbox';

import route from './js/routes.jsx';
import reducer from './js/reducers';

import thunk from 'redux-thunk';

const store = createStore(combineReducers(reducer), applyMiddleware(thunk));

const browserHistory = useRouterHistory(createHistory)({
  basename: '',
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
    };

    this.hideModal = this.hideModal.bind(this);
  }

  isFormData() {
    let ourStore = store.getState();
    for (formValue in ourStore.form.data) {
      // console.log(Object.values(formData)[value]);
      // console.log(typeof(Object.values(formData)[value]));
      if (Object.values(ourStore.form.data)[formValue] == undefined) {
        console.log(false);
        return false;
      } else {
        return true;
      }
    }
  }


  showModal(linkRedirect) {

    if (!this.isFormData()) {
      return;
    }

    this.setState({
      link: linkRedirect,
      modalVisible: true,
    });

    console.log('Link: ' + this.state.link);
    console.log('Visible?: ' + this.state.modalVisible);

  }

  hideModal() {
    this.setState({
      modalVisible: false,
    });
  }

  render() {
    return (
      <div>
        <header className="schemaform-block-header site-header" role="banner">
          <div className="usa-nav-container form-nav">
            <nav className="language-nav">
              <a
                className="active language"
                href="#"
                onClick={() => this.showModal('/police-complaint/')}
              >
                English
              </a>
              <a
                href="#"
                className="second"
                onClick={() => this.showModal('/policia-queja/')}
              >
                Español
              </a>
            </nav>
            <nav className="site-nav">City of Austin</nav>
          </div>
        </header>
        <Provider store={store}>
          <Router history={browserHistory}>{route}</Router>
        </Provider>

        {this.state.modalVisible ? (
          <Modalbox link={this.state.link} hideModal={this.hideModal} />
        ) : (
          ''
        )}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

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
    // form language is a string used in build process to control the language of the modal
    this.currentFormLanguage = 'opo_current_language_english';
    this.state = {
      modalVisible: false,
    };

    this.hideModal = this.hideModal.bind(this);
  }

  // Redirects to a specific url
  redirectUrl(url) {
    window.location = url;
  }

  // Returns 'true' if there is form data
  isFormData() {
    let ourStore = store.getState();

    // For each
    for (let formValue in ourStore.form.data) {
      let formItemValue = ourStore.form.data[formValue];

      if (formItemValue != undefined && typeof formItemValue != 'object') {
        return true;
      }
    }
    return false;
  }

  // Returns 'true' if there is form data
  hasFormData(formData) {
    let hasData;
    // For each
    for (let formValue in formData) {
      let formItemValue = formData[formValue];
      if (
          formItemValue === undefined ||
          (typeof formItemValue === 'object' && !this.hasFormData(formItemValue))
      ) {
        hasData = false;
      }
      else {
        hasData = true;
        break;
      }
    }
    return hasData;
  }

  // Shows the modal message
  showModal(
      linkRedirect,
      title,
      message,
      calltoaction,
      buttonCancel,
      buttonProceed,
  ) {
    // If the language is the same, then ignore the click...
    if (
        (linkRedirect + '/') == `/${process.env.DEPLOYMENT_PATH}/`
    ) {
      console.log('Click ignored, same language');
      return;
    }

    // we have data and a different language, let's ask ...
    let ourStore = store.getState();
    if (this.hasFormData(ourStore.form.data)) {
      this.setState({
        link: linkRedirect,
        title: title,
        message: message,
        calltoaction: calltoaction,
        buttonCancel: buttonCancel,
        buttonProceed: buttonProceed,
        modalVisible: true,
      });
    } else {
      // Else, If no data provided, ignore and redirect.
      this.redirectUrl(linkRedirect);
      // console.log("Redirecting...");
    }
  }

  // Changes the state to destroy the modal
  hideModal() {
    console.log('hideModal() Hiding modal ...');
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
                    href="#"
                    className="active language"
                    onClick={() =>
                        this.showModal(
                            `/${process.env.DEPLOYMENT_PATH_EN}`,
                            'Start over in English?',
                            'Switching to English will erase all the information you have previously entered.',
                            'Are you sure you want to switch?',
                            'No, proceed in Spanish.',
                            'Yes, start over in English.',
                        )
                    }
                >
                  English
                </a>
                <a
                    href="#"
                    className="second"
                    onClick={() =>
                        this.showModal(
                            `/${process.env.DEPLOYMENT_PATH_ES}`,
                            'Start over in Spanish?',
                            'Switching to Spanish will erase all the information you have previously entered.',
                            'Are you sure you want to switch?',
                            'No, proceed in English.',
                            'Yes, start over in Spanish.',
                        )
                    }
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
              <Modalbox
                  link={this.state.link}
                  title={this.state.title}
                  message={this.state.message}
                  calltoaction={this.state.calltoaction}
                  buttonCancel={this.state.buttonCancel}
                  buttonProceed={this.state.buttonProceed}
                  hideModal={this.hideModal}
              />
          ) : (
              ''
          )}
        </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

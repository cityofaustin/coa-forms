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

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false
        };

        this.hideModal = this.hideModal.bind(this);
    }

    // Shows the modal message
    showModal(linkRedirect, title, message, calltoaction, buttonCancel, buttonProceed) {
        this.setState({
            link: linkRedirect,
            title: title,
            message: message,
            calltoaction: calltoaction,
            buttonCancel: buttonCancel,
            buttonProceed: buttonProceed,
            modalVisible: true
        });
    }

    // Changes the state to destroy the modal
    hideModal() {
        console.log("hideModal() Hiding modal ...");
        this.setState({
            modalVisible: false
        })
    }

    render() {

        return (
            <div>
                <header className="schemaform-block-header site-header" role="banner">
                    <div className="usa-nav-container form-nav">
                        <nav className="language-nav">
                            <a className="active language" href="#" onClick={() => this.showModal(
                                    "/police-complaint/",
                                    "Start over in English?",
                                    "Switching to English will erase all the information you have previously entered.",
                                    "Are you sure you want to switch?",
                                    "Cancel, stay in this form.",
                                    "Yes, start over in English.")}>
                                English
                            </a>
                            <a href="#" className="second" onClick={() => this.showModal(
                                "/policia-queja/",
                                "Start over in Spanish?",
                                "Switching to Spanish will erase all the information you have previously entered.",
                                "Are you sure you want to switch?",
                                "No, proceed in English.",
                                "Yes, start over in Spanish.")}>
                                Español
                            </a>
                        </nav>
                        <nav className="site-nav">City of Austin</nav>
                    </div>
                </header>
                <Provider store={store}>
                    <Router history={browserHistory}>{route}</Router>
                </Provider>

                {   this.state.modalVisible ? <Modalbox
                        link={this.state.link}
                        title={this.state.title}
                        message={this.state.message}
                        calltoaction={this.state.calltoaction}
                        buttonCancel={this.state.buttonCancel}
                        buttonProceed={this.state.buttonProceed}
                        hideModal={this.hideModal} />
                    : ""
                }
            </div>
        );
    }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root'),
);

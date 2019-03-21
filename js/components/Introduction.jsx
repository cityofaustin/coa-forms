import React from 'react';
import PropTypes from 'prop-types';

import ProgressButton from 'us-forms-system/lib/js/components/ProgressButton';
import FormTitle from 'us-forms-system/lib/js/components/FormTitle';
import uswds from 'uswds';

class Introduction extends React.Component {
  constructor(props) {
    super(props);
    this.startForm = this.startForm.bind(this);
  }

  startForm() {
    const firstPage = this.props.route.pageList[1].path;
    this.props.router.push(firstPage);
  }

  render() {
    return (
      <div className="schemaform-intro">
        <a href="https://alpha.austin.gov/police-oversight">
          <div className="intro-nav-container">
            <i className="material-icons arrow_back">arrow_back</i>
            <h6 className="nav-heading">Office of Police Oversight</h6>
          </div>
        </a>
        <hr className="intro-rule" />
        <div className="usa-grid">
          <div className="intro-container">
            <h2 className="intro-heading"> Thank an Austin police officer </h2>
            <hr className="form-rule" />
            <h4 className="intro-select">Select an option</h4>
          </div>
          <ul className="usa-accordion-bordered">
            <li>
              <button
                className="usa-accordion-button"
                aria-expanded="false"
                aria-controls="b-a1"
              >
                Online
              </button>
              <div
                id="b-a1"
                className="usa-accordion-content"
                aria-hidden="false"
              >
                <h4>Required information</h4>
                <ul className="accordion-list">
                  <li>What happened</li>
                </ul>
                <hr className="accordion-rule" />
                <h4>Optional information</h4>
                <ul className="accordion-list">
                  <li>Date and time</li>
                  <li>Officer(s) involved</li>
                </ul>
                <ProgressButton
                  onButtonClick={this.startForm}
                  buttonText="Start"
                  buttonClass="usa-button-primary schemaform-start-button"
                />
              </div>
            </li>
            <li>
              <button
                className="usa-accordion-button"
                aria-expanded="false"
                aria-controls="b-a2"
              >
                Over the phone
              </button>
              <div
                id="b-a2"
                className="usa-accordion-content"
                aria-hidden="true"
              >
                <p>
                  Call the Office of Police Oversight at <a href="tel:+1-512-972-2676">(512) 972-2676</a>. We’d be
                  happy to speak with you.
                </p>

                <p>
                  If you need an interpreter, you can call with a friend to
                  interpret for you or ask for an interpreter. Just tell us the
                  language you prefer.
                </p>
                <p>Office hours are Monday through Friday, 8 am to 5 pm.</p>
              </div>
            </li>
            <li>
              <button
                className="usa-accordion-button"
                aria-expanded="false"
                aria-controls="b-a3"
              >
                In person
              </button>
              <div
                id="b-a3"
                className="usa-accordion-content"
                aria-hidden="true"
              >
                <p>
                  You can share thanks in person at the Office of Police Oversight at 1520 Rutherford Lane, Austin, TX 78754. We are in Building 1, on the 2nd floor, Suite 211. Visitor parking is in front of the main entrance.
                </p>
                <p>Office hours are Monday through Friday, 8 am to 5 pm.</p>
              </div>
            </li>
            <li>
              <button
                className="usa-accordion-button"
                aria-expanded="false"
                aria-controls="b-a4"
              >
                By mail
              </button>
              <div
                id="b-a4"
                className="usa-accordion-content"
                aria-hidden="true"
              >
                <p>
                  <a href="/files/OPO_thanks-form_print_English.pdf">Download the thanks form (PDF)</a>. Print and fill out the
                  form, then mail it to:
                </p>
                <address>
                  Office of Police Oversight
                  <br />
                  P.O. Box 1088
                  <br />
                  Austin, TX 78767
                </address>
              </div>
            </li>
          </ul>
          <h2 className="intro-about">About us</h2>
          <p>
            We are the Office of Police Oversight, impartial and separate from
            the Austin Police Department.
          </p>
          <a href="https://alpha.austin.gov/police-oversight">Learn more about who we are and what we do.</a>
        </div>
      </div>
    );
  }
}

Introduction.propTypes = {
  route: PropTypes.object,
  router: PropTypes.object,
};

export default Introduction;

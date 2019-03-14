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
            <h1 className="intro-heading"> File a complaint </h1>
            <hr className="form-rule" />
            <p>
              You DO NOT have to give personal information in order to file a
              complaint.
            </p>
            <p>
              By telling us about your experience, you help us better serve you
              and your community. Thank you.
            </p>
            <h2 className="intro-select">Select an option</h2>
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
                <h3>Required information</h3>
                <ul className="accordion-list">
                  <li>What happened</li>
                  <li>Time </li>
                </ul>
                <hr className="accordion-rule" />
                <h3>Optional information</h3>
                <ul className="accordion-list">
                  <li>Officer(s) involved</li>
                  <li>Witness(es) </li>
                  <li>
                    Your contact information for us to follow up with you
                    (interpreters available)
                  </li>
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
                  Call the Office of Police Oversight at (512) 972-2676. We’d be
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
                  You can complete the form in person at the Office of Police
                  Oversight at 1520 Rutherford Lane, Austin, TX 78754. We are in
                  Building 1, on the 2nd floor, Suite 211. Visitor parking is in
                  front of the main entrance. You will need to check in with
                  building security at the front desk.
                </p>

                <p>
                  If you need an interpreter, you can come with a friend to
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
                  <a href="/files/OPO_complaint-form_print_English.pdf">Download the complaint form (PDF)</a>. Print and fill out the
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

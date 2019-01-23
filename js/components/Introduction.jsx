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
        <h6 className="usa-heading-alt"> Office of Police Oversight </h6>
        <hr />
        <h2> File a Complaint </h2>
        <hr />
        <p>
          You DO NOT have to give personal information in order to file a
          complaint.
        </p>
        <p>
          By telling us about your experience, you help us better serve you and
          your community. Thank you.
        </p>
        <h4>Select an option</h4>

        <ul className="usa-accordion-bordered">
          <li>
            <button
              className="usa-accordion-button"
              aria-expanded="true"
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
              <ul>
                <li>What happened</li>
                <li>Time </li>
              </ul>
              <hr />
              <h4>Optional information</h4>
              <ul>
                <li>Officer(s) involved</li>
                <li>Witness(es) </li>
                <li>
                  Your contact information for us to follow up with you
                  (translators available)
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
            <div id="b-a2" className="usa-accordion-content" aria-hidden="true">
              Call the Office of Police Oversight at 512-972-2676. We’d be happy
              to speak with you. If you need language translation, you can call
              with a friend to translate for you or ask for a translator. Just
              tell us the language you prefer. Office hours are Monday through
              Friday, 9 am to 5 pm.
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
            <div id="b-a3" className="usa-accordion-content" aria-hidden="true">
              Call the Office of Police Oversight at 512-972-2676. We’d be happy
              to speak with you. If you need language translation, you can call
              with a friend to translate for you or ask for a translator. Just
              tell us the language you prefer. Office hours are Monday through
              Friday, 9 am to 5 pm.
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
            <div id="b-a4" className="usa-accordion-content" aria-hidden="true">
              You can complete the form in person at the Office of Police
              Oversight at 1520 Rutherford Lane, Austin, TX 78754. We are in
              Building 1, on the 2nd floor, Suite 211. Visitor parking is in
              front of the main entrance. You will need to check in with
              building security at the front desk. If you need language
              translation, you can bring a friend to translate for you or ask
              for a translator. Just tell us the language you prefer. Office
              hours are Monday through Friday, 9 am to 5 pm.
            </div>
          </li>
        </ul>
        <h3>About Us</h3>
        <p>
          We are the Office of Police Oversight, impartial and separate from the
          Austin Police Department.
        </p>
        <a href="">Learn more about who we are and what we do.</a>
      </div>
    );
  }
}

Introduction.propTypes = {
  route: PropTypes.object,
  router: PropTypes.object,
};

export default Introduction;

import React from 'react';
import PropTypes from 'prop-types';

import ProgressButton from '@cityofaustin/us-forms-system/lib/js/components/ProgressButton';
import SegmentedProgressBar from '@cityofaustin/us-forms-system/lib/js/components/SegmentedProgressBar';

import '../../css/Confirmation.scss';

class Confirmation extends React.Component {
  constructor(props) {
    super(props);

    let formData = JSON.parse(localStorage.getItem('opo_form_data'));
    let confirmationNumber =
      localStorage.getItem('opo_confirmation_case_number') || 'N/A';
    let submitUrl = localStorage.getItem('opo_form_submiturl') || '';
    let userEmail = '';
    try {
      userEmail = formData['view:contactPreferences'].yourEmail;
    } catch {
      userEmail = '';
    }

    let initialSubmissionState = this.validateEmail(userEmail) ? -1 : 0;

    this.state = {
      formSubmissionState: initialSubmissionState,
      userEmail: userEmail,
      errorMessage: '',
      formData: formData,
      submitUrl: submitUrl,
      confirmationCaseNumber: confirmationNumber,
    };
  }

  // Returns true if the email address looks normal...
  validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Submits the form
  submitForm() {
    // console.log("submitForm() We are going to output your data here: ");
    // console.log(this.state);
    let formData = this.state.formData;

    // Let's validate the email address, or show an error message ...
    if (
      this.validateEmail(this.state.userEmail) == false ||
      this.state.userEmail == ''
    ) {
      // console.log("We have a problem with the email: " + this.state.userEmail);
      this.setState({
        errorMessage: 'Please provide a valid email address.',
      });
    } else {
      // Let's change the form data prior to submission ...
      // Reassign the email, or set up the value.

      formData["view:contactPreferences"] = formData["view:contactPreferences"] || {};
      formData["view:contactPreferences"].yourEmail = this.state.userEmail;

      // Append two needed fields for the backend...
      formData.confirmationCaseNumber = this.state.confirmationCaseNumber;

      // Let's move forward...
      this.setState({
        formData: formData,
      });

      // Run the loading (three dots) animation...
      this.formLoading();

      setTimeout(this.formDone, 1000, this);

      // Make the XHR request with the formData and send to the submitUrl endpoint
      this.make_xhr_request(formData, this.state.submitUrl, this);
    }
  }

  // Triggers the three dots animation by changing the state
  formLoading() {
    this.setState({
      formSubmissionState: 1,
    });
  }

  // Triggers the checkmark animation by changing the state
  formDone(context) {
    context.setState({
      formSubmissionState: 2,
    });
  }

  // Hides the error message
  hideErrorMessage() {
    this.setState({
      errorMessage: '',
    });
  }

  // Clears all the keys used during the form...
  clearLocalStorage() {
    // console.log("clearLocalStorage() Clearing opo_form_submiturl");
    localStorage.removeItem('opo_form_submiturl');
    // console.log("clearLocalStorage() Clearing opo_confirmation_case_number");
    localStorage.removeItem('opo_confirmation_case_number');
    // console.log("clearLocalStorage() Clearing opo_form_data");
    localStorage.removeItem('opo_form_data');
  }

  // Instantiates an XHR request, then submits to submitUrl
  make_xhr_request(formData, submitUrl, formContext = null) {
    // console.log("API_URL: " + submitUrl);
    // console.log("Appending formConfig to formData!");
    // console.log(formData);

    // Create the XHR request
    var request = new XMLHttpRequest();
    // Return it as a Promise
    return new Promise(function(resolve, reject) {
      // Setup our listener to process complete requests
      request.onreadystatechange = function() {
        // Only run if the request is complete
        if (request.readyState !== 4) return;
        // Process the response
        if (request.status >= 200 && request.status < 300) {
          // If successful
          resolve(request);
        } else {
          // If failed
          reject({
            status: request.status,
            statusText: request.statusText,
          });
        }
      };

      // Setup our HTTP request, headers & send our payload ...
      request.open('POST', submitUrl, true);
      request.setRequestHeader(
        'Content-Type',
        'application/json;charset=UTF-8',
      );

      request.send(JSON.stringify(formData));
    })
      .then(function(response) {
        formContext.formDone(formContext);
        formContext.clearLocalStorage();
        return response;
      })
      .catch(function(error) {
        console.log('Error: ');
        console.log(error);
        // return error;
      });
  }

  // Renders the right button based on the state formSubmissionState
  // 0 = Submit (regular)
  // 1 = Loading (three dots animation)
  // 2 = Done (animated checkmark, green button)
  renderButton() {
    switch (this.state.formSubmissionState) {
      case 1:
        return (
          <button
            className="confirmation__button"
            onClick={() => this.submitForm()}
          >
            <div className="confirmation__button--loading-btn" />
          </button>
        );
      case 2:
        return (
          <button
            className="confirmation__button confirmation__button--success"
            onClick={null}
          >
            <div className="confirmation__button-checkmark-container">
              <div className="confirmation__button-checkmark draw">&nbsp;</div>
            </div>
          </button>
        );
      default:
        return (
          <button
            className="confirmation__button"
            onClick={() => this.submitForm()}
          >
            Submit
          </button>
        );
    }
  }

  render() {
    let confirmationCaseNumber = this.state.confirmationCaseNumber;
    let email_content = null;
    let confirmation_content = null;

    if (this.state.formSubmissionState === -1) {
      email_content = (
        <p>
          You will receive an email with a copy of your complaint at{' '}
          <b>{this.state.userEmail}</b>.
        </p>
      );
    }

    // If user request follow up and provided info, show this messages
    if (this.state.formData.remainAnonymous === 'followUp') {
      confirmation_content = (
        <div className="confirmation__sent-acknowledgement">
          {email_content}
          <p>
            A staff person from the Office of Police Oversight will contact you
            within 2 to 4 business days.
          </p>
          <p>
            You can email us at <a href="mailto:policeoversight@austintexas.gov">policeoversight@austintexas.gov</a> or call us at
            (512) 972-2676 to find where your complaint is in this process.
          </p>
        </div>
      );
      // Clear the stored data
      this.clearLocalStorage();
    }

    return (
      <div className="schemaform-intro">
        <h2>We have received your complaint.</h2>
        {confirmation_content}
        <p>
          Our job is to make sure your complaint is investigated fairly and
          thoroughly. Thank you for sharing your experience with us. This helps
          us better serve you and your community.
        </p>
        <p>
          <a href="http://alpha.austin.gov/police-oversight/complaint-investigation-process">
            What happens next
          </a>
        </p>
      </div>
    );
  }
}

Confirmation.propTypes = {
  route: PropTypes.object,
  router: PropTypes.object,
};

export default Confirmation;

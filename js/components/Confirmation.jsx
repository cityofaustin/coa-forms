import React from "react";
import PropTypes from "prop-types";

import ProgressButton from "us-forms-system/lib/js/components/ProgressButton";
import SegmentedProgressBar from "us-forms-system/lib/js/components/SegmentedProgressBar";

class Confirmation extends React.Component {
  render() {
    let confirmationCaseNumber = localStorage.getItem("opo_confirmation_case_number") || "N/A";
    return (
      <div className="schemaform-intro">
        <SegmentedProgressBar total={2} current={2}/>
        <h2 style={{textAlign: "center"}}>We have received your complaint.</h2>
        <h3 style={{color: "#164ED2", textAlign: "center"}}>Your case number: {confirmationCaseNumber}</h3>
        <p style={{fontSize: "1.4rem"}}>Our job is to make sure your complaint is investigated fairly and thoroughly. Thank you for sharing your experience with us. This helps us better serve you and your community.</p>
        <hr/>
        <p style={{fontSize: "1.4rem"}}>You will receive an email with a copy of your complaint and a confirmation number. You can email us at <a>policeoversight@austintexas.gov</a> or call us at <a>512-972-2676</a> with your confirmation number to find where your complaint is in this process.</p>
        <p style={{fontSize: "1.4rem"}}>If you provided your contact information, a staff person from the Office of Police Oversight will contact you within two to four business days.</p>
        <hr/>
        <p style={{fontSize: "1.4rem"}}><a>What happens next</a></p>
      </div>
    );
  }
}

Confirmation.propTypes = {
  route: PropTypes.object,
  router: PropTypes.object
};

export default Confirmation;

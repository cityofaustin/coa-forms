import React from "react";
import PropTypes from "prop-types";

import ProgressButton from "us-forms-system/lib/js/components/ProgressButton";
import SegmentedProgressBar from "us-forms-system/lib/js/components/SegmentedProgressBar";

class Confirmation extends React.Component {
  render() {
    return (
      <div className="schemaform-intro">
        <SegmentedProgressBar total={2} current={2}/>
        <h2 style={{textAlign: "center"}}>We’re glad to hear you had a good experience!</h2>
        <hr/>
        <p style={{fontSize: "1.4rem"}}>Your thank-you note will go to the Office of Police Oversight and the Austin Police Department’s Internal Affairs division, as well as to the officer’s chain of command. </p>
        <p style={{fontSize: "1.4rem"}}>If you provided your contact information, a staff person from the Office of Police Oversight will contact you within 2 to 4 business days, and you will receive an email with a copy of your thank-you note.</p>
      </div>
    );
  }
}

Confirmation.propTypes = {
  route: PropTypes.object,
  router: PropTypes.object
};

export default Confirmation;

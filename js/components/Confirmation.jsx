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
        <p style={{fontSize: "1.4rem"}}>Thank you for telling us about your experience with the Austin Police Department. This helps us better serve you and your community.</p>
        <hr/>
        <p style={{fontSize: "1.4rem"}}><a>What happens next</a></p>
        <p style={{fontSize: "1.4rem"}}>Your thank-you note will go to the Office of Police Oversight and the Austin Police Department’s Internal Affairs division, as well as to the officer’s chain of command. You’ll also receive an email with a copy of your thank-you note.</p>
      </div>
    );
  }
}

Confirmation.propTypes = {
  route: PropTypes.object,
  router: PropTypes.object
};

export default Confirmation;


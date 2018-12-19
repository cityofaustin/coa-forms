import React from "react";
import PropTypes from "prop-types";

import ProgressButton from "us-forms-system/lib/js/components/ProgressButton";
import FormTitle from "us-forms-system/lib/js/components/FormTitle";

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
        <FormTitle title="Officer Complaint Form" />
        <h1>Tell us about your experience with the Austin Police Department</h1>
        <p>
          We are the Civilian Office of Police Oversight and Accountability. We
          are an independent and unbiased office. In other words, we are not a
          part of the Police Department.
        </p>
        <p>
          By telling us about your experience, you help us hold officers
          accountable and advise on policing best practices. We understand that
          fear of police retaliation but we’d like to assure you
        </p>
        <p>
          Police are not allowed to retaliate against you. We will facilitate
          this process so that you are as comfortable as possible. Find out more
          about who we are and what we do.
        </p>
        <h1>Here’s what to expect</h1>
        <h2>Process</h2>
        <p>
          Your complaint will be investigated by Internal Affairs at the Austin
          Police Department and overseen by the Civilian Office of Police
          Oversight and Accountability.
        </p>
        <h2>Timeframe</h2>
        <p>
          Investigations could take as little as 30 days or up to six months to
          complete. It may require 1-4 hours of your time over the course of
          those months.
        </p>
        <h2>Outcomes</h2>
        <p>
          The nature of your case will determine if any policy change or
          punishment of the officer(s) occurs. Find out more on potential
          outcomes here.
        </p>
        <ProgressButton
          onButtonClick={this.startForm}
          buttonText="I agree, begin form"
          buttonClass="usa-button-primary schemaform-start-button"
          afterText="»"
        />
      </div>
    );
  }
}

Introduction.propTypes = {
  route: PropTypes.object,
  router: PropTypes.object
};

export default Introduction;

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
        <FormTitle title="Police Oversight and Accountability Form" />
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
        <ProgressButton
          onButtonClick={this.startForm}
          buttonText="Fill out the online form"
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

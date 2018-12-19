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
        <h1>Officer Thanks Form</h1>
        <p>Thanks 😃</p>
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

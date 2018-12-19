import React from "react";
import PropTypes from "prop-types";

import FormApp from "us-forms-system/lib/js/containers/FormApp";
import formConfig from "./usfsFormConfig";

import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

export default function Form({ location, children }) {
  const store = mockStore({ form: { data: {} } });

  return (
    <FormApp formConfig={formConfig} currentLocation={location} store={store}>
      {children}
    </FormApp>
  );
}

Form.propTypes = {
  children: PropTypes.object,
  location: PropTypes.object
};

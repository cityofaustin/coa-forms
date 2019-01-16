import React from "react";
import PropTypes from "prop-types";

import FormApp from "us-forms-system/lib/js/containers/FormApp";
import FormPage from "us-forms-system/lib/js/containers/FormPage";
import formConfig from "./usfsFormConfig";

import configureStore from "redux-mock-store";

import "us-forms-system/lib/css/styles.css";

const mockStore = configureStore([]);

export default function Form({ location, chapter, page }) {
  const pageObject = Object.values(chapter.pages)[0];
  let properties = {};
  for (const propertyKey in pageObject.schema.properties) {
    properties[propertyKey] =
      pageObject.schema.properties[propertyKey].type == "array"
        ? {
            items: [],
            type: "array",
            additionalItems: pageObject.schema.properties[propertyKey].items
          }
        : pageObject.schema.properties[propertyKey];
  }
  pageObject.schema.properties = properties;

  const chapterThatWorksWithArraysToo = chapter => ({
    title: chapter.title,
    pages: {
      [Object.keys(chapter.pages)[0]]: pageObject
    }
  });

  const store = mockStore({ form: chapter });

  return (
    <div>
      <script src="https://maps.googleapis.com/maps/api/js?&v=3.exp&libraries=geometry,drawing,places" />
      <FormApp formConfig={formConfig} currentLocation={location} store={store}>
        <FormPage
          store={store}
          route={{
            pageConfig: { pageKey: page, title: "Blarg" },
            pageList: [{ path: location }]
          }}
          location={{ pathname: location }}
        />
      </FormApp>
    </div>
  );
}

Form.propTypes = {
  children: PropTypes.object,
  location: PropTypes.object
};

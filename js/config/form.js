import React from "react";
import Introduction from '../components/Introduction.jsx';
import Confirmation from '../components/Confirmation.jsx';

import {
  whatHappenedChapter,
  officerDetailsChapter,
  aboutYouChapter,
} from './chapters';

const formConfig = {
  type: "thanks",
  language: "en",
  title: 'Thank the APD',
  subTitle: '',
  formId: '',
  urlPrefix: '/police-thank/',
  trackingPrefix: 'form-',
  submit: (formData, formConfig) => {
    console.log("Appending formConfig to formData");
    console.log("formConfig.language: " + formConfig.language);
    console.log("formConfig.type: " + formConfig.type);

    formData.data.language = formConfig.language;
    formData.data.type = formConfig.type;

    console.log("Submitting:");
    console.log(formData.data);

    // Create the XHR request
    var request = new XMLHttpRequest();
    // Return it as a Promise
    return new Promise(function (resolve, reject) {
      // Setup our listener to process compeleted requests
      request.onreadystatechange = function () {
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
            statusText: request.statusText
          });
        }
      };
      // Setup our HTTP request, headers & send our payload ...
      request.open('POST', formConfig.submitUrl, true);
      request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      request.send(JSON.stringify(formData.data));
    })
    .then(function (response) {
      console.log("Success: ");
      console.log(response.response);
      let respObj = JSON.parse(response.response);
      console.log(respObj.case_number);
      localStorage.setItem("opo_confirmation_case_number", respObj.case_number);
      return response;
    })
    .catch(function (error) {
      console.log("Error: ");
      console.log(error);
      return error;
    });
  },
  submitUrl: `${process.env.API_URL}/form/submit`,
  introduction: Introduction,
  confirmation: Confirmation,
  defaultDefinitions: {},
  openAllChaptersOnReview: true,
  hideNavArrows: true,
  chapters: {
    whatHappenedChapter,
    officerDetailsChapter,
    aboutYouChapter,
  },
};

export default formConfig;

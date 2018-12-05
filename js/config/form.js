import React from "react";
import Introduction from "../components/Introduction.jsx";
import DateTimeWidget from "../components/DateTimeWidget.jsx";
import LocationPickerWidget from "../components/LocationPickerWidget.jsx";

const formConfig = {
  title: "Police Oversight and Accountability Form",
  subTitle: "",
  formId: "",
  urlPrefix: "/",
  trackingPrefix: "form-",
  transformForSubmit: "",
  submitUrl: "",
  introduction: Introduction,
  confirmation: "",
  defaultDefinitions: {},
  chapters: {
    experienceChapter: {
      pages: {
        experienceType: {
          path: "experience-type",
          title: "Experience Type",
          schema: {
            type: "object",
            required: ["experienceType"],
            properties: {
              experienceType: {
                type: "string",
                enum: ["complaint", "compliment"],
                enumNames: ["Submit a complaint", "Send a compliment"]
              }
            }
          },
          uiSchema: {
            "ui:title": "Tell us what experience you would like to share",
            experienceType: {
              "ui:title": "I'd like to:",
              "ui:widget": "radio"
            }
          }
        }
      }
    },
    beginComplaintChapter: {
      pages: {
        beginComplaint: {
          path: "begin-complaint",
          title: "Begin Complaint",
          depends: {
            experienceType: "complaint"
          },
          schema: {
            type: "object",
            required: ["readyToContinueComplaint"],
            properties: {
              "view:textObject": {
                type: "object",
                properties: {}
              },
              readyToContinueComplaint: {
                type: "boolean",
                default: null,
                enum: [null, true]
              }
            }
          },
          uiSchema: {
            "ui:title":
              "We’re sorry you had a poor experience with the Austin Police Department",
            "view:textObject": {
              "ui:description": () => (
                <div>
                  <h1>Here’s what to expect</h1>
                  <h2>Process</h2>
                  <p>
                    Your complaint will be investigated by Internal Affairs at
                    the Austin Police Department and overseen by the Civilian
                    Office of Police Oversight and Accountability.
                  </p>
                  <h2>Timeframe</h2>
                  <p>
                    Investigations could take as little as 30 days or up to six
                    months to complete. It may require 1-4 hours of your time
                    over the course of those months.
                  </p>
                  <h2>Outcomes</h2>
                  <p>
                    The nature of your case will determine if any policy change
                    or punishment of the officer(s) occurs. Find out more on
                    potential outcomes here.
                  </p>
                </div>
              )
            },
            readyToContinueComplaint: {
              "ui:title":
                "I understand, and I’m ready to continue with the form."
            }
          }
        }
      }
    },
    whatHappenedChapter: {
      pages: {
        whatHappened: {
          path: "what-happened",
          title: "Tell us what happened",
          schema: {
            type: "object",
            required: ["description"],
            properties: {
              description: {
                type: "string"
              },
              datetime: {
                type: "string"
              },
              location: {
                type: "string"
              }
            }
          },
          uiSchema: {
            "ui:title": "Tell us what happened",
            description: {
              "ui:title": "Description",
              "ui:description":
                "Please provide a detailed description of your experience with the Austin Police Department"
            },
            datetime: {
              "ui:title": "Date and time, if known",
              "ui:widget": DateTimeWidget
            },
            location: {
              "ui:title": "Location, if known",
              "ui:widget": LocationPickerWidget
            }
          }
        }
      }
    },
    secondChapter: {
      title: "Second Chapter",
      pages: {}
    }
  }
};

export default formConfig;

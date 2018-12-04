import Introduction from "../components/Introduction.jsx";

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
    firstChapter: {
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
        },
        beginComplaint: {
          path: "begin-complaint",
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
            readyToContinueComplaint: {
              "ui:title":
                " I understand, and I’m ready to continue with the form.",
              "view:textObject": {
                "ui:description": "Tell us how to contact you."
              }
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

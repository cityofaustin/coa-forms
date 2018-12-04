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
      title: "Tell us what experience you would like to share",
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
            experienceType: {
              "ui:title": "I'd like to:",
              "ui:widget": "radio"
            }
          }
        },
        beginComplaint: {
          path: "beginComplaint",
          title:
            "We’re sorry you had a poor experience with the Austin Police Department",
          depends: {
            experienceType: "complaint"
          },
          schema: {
            type: "object",
            required: ["readyToContinueComplaint"],
            properties: {
              readyToContinueComplaint: {
                type: "boolean"
              }
            }
          },
          uiSchema: {
            readyToContinueComplaint: {
              "ui:title":
                " I understand, and I’m ready to continue with the form."
            }
          }
        }
      }
    },
    secondChapter: {
      title: "Second Chapter",
      depends: {
        experienceType: "complaint"
      },
      pages: {}
    }
  }
};

export default formConfig;

import { OfficerDetailsDisplayWidget } from "@cityofaustin/usfs-components";
import { raceBlocks, genderBlocks } from "@cityofaustin/usfs-schema-blocks";

const officerDetailsChapter = {
  title: "Tell us about the officer(s)",
  pages: {
    officerDetails: {
      path: "officer-details",
      title: "Tell us about the officer(s)",
      schema: {
        type: "object",
        required: ["hasOfficerDetails"],
        properties: {
          hasOfficerDetails: {
            type: "boolean",
            enumNames: ["Yes", "No"]
          },
          officers: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                description: { type: "string" },
                ...raceBlocks.schema,
                ...genderBlocks.schema,
                badgeNumber: {
                  type: "string"
                },
                uniformed: {
                  type: "boolean",
                  enumNames: ["In uniform", "In regular clothes"]
                },
                transportation: {
                  type: "string",
                  enum: ["patrol", "unmarked", "horse", "bicycle", "other"],
                  enumNames: [
                    "Patrol car",
                    "Unmarked car",
                    "Horse",
                    "Bicycle",
                    "Other"
                  ]
                },
                otherTransportation: {
                  type: "string",
                  "ui:collapsed": true
                },
                turnedOffCamera: {
                  type: "boolean",
                  enumNames: ["Yes", "No"]
                }
              }
            }
          }
        }
      },
      uiSchema: {
        "ui:title": "Tell us about the officer(s)",
        hasOfficerDetails: {
          "ui:title":
            "Do you remember or have access to any details about the officer(s) you’d like to share?",
          "ui:widget": "radio",
          "ui:options": {
            hideOnReview: true,
            classNames: "big-button-radio"
          }
        },
        officers: {
          "ui:options": {
            viewField: OfficerDetailsDisplayWidget,
            addable: true,
            expandUnder: "hasOfficerDetails"
          },
          items: {
            name: {
              "ui:title": "Officer Name",
              "ui:options": {
                hideOnReviewIfFalse: true
              }
            },
            description: {
              "ui:title": "Officer Description",
              "ui:options": {
                hideOnReviewIfFalse: true
              }
            },
            ...raceBlocks.ui,
            ...genderBlocks.ui,
            badgeNumber: {
              "ui:title": "Officer badge number",
              "ui:options": {
                hideOnReviewIfFalse: true
              }
            },
            uniformed: {
              "ui:title": "Was the officer in uniform or in regular clothes?",
              "ui:widget": "radio",
              "ui:options": {
                hideOnReviewIfFalse: true
              }
            },
            transportation: {
              "ui:title":
                "What kind of car or transportation was the officer in?",
              "ui:widget": "radio",
              "ui:options": {
                hideOnReviewIfFalse: true
              }
            },
            otherTransportation: {
              "ui:title": " ",
              "ui:options": {
                expandUnder: "transportation",
                expandUnderCondition: "other",
                hideOnReviewIfFalse: true
              }
            },
            turnedOffCamera: {
              "ui:title": "Did you see the officer turn their body camera off?",
              "ui:widget": "radio",
              "ui:options": {
                hideOnReviewIfFalse: true
              }
            }
          }
        }
      }
    }
  }
};

export default officerDetailsChapter;

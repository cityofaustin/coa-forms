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
                physicalDescription: { type: "string" },
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
                    "Patrol car or motorcycle",
                    "Unmarked car or motorcycle",
                    "Horse",
                    "Bicycle",
                    "On foot",
                    "I don't know",
                    "Other"
                  ]
                },
                otherTransportation: {
                  type: "string",
                  "ui:collapsed": true
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
            "Do you remember any details about the officer(s) you’d like to share?",
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
              "ui:title": "Name",
              "ui:options": {
                hideOnReviewIfFalse: true
              }
            },
            physicalDescription: {
              "ui:title": "Physical Description",
              "ui:description": "Examples: hair color, eye color, weight, height, facial hair, tattoos, scars, etc.",
              "ui:options": {
                hideOnReviewIfFalse: true
              }
            },
            ...raceBlocks.ui,
            ...genderBlocks.ui,
            badgeNumber: {
              "ui:title": "Badge Number",
              "ui:options": {
                hideOnReviewIfFalse: true
              }
            },
            uniformed: {
              "ui:title": "What was the officer wearing?",
              "ui:widget": "radio",
              "ui:options": {
                hideOnReviewIfFalse: true
              }
            },
            transportation: {
              "ui:title":
                "What kind of car or transportation was the officer using?",
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
            }
          }
        }
      }
    }
  }
};

export default officerDetailsChapter;

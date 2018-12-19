import React from "react";
import Introduction from "../components/Introduction.jsx";

import {
  DateTimeWidget,
  DateTimeReviewWidget,
  LocationPickerWidget,
  LocationReviewWidget,
  FileUploadWidget,
  FileUploadReviewWidget,
  OfficerDetailsDisplayWidget,
  WitnessDetailsDisplayWidget
} from "@cityofaustin/usfs-components";

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
    whatHappenedChapter: {
      title: "Tell us what happened",
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
                "Please provide a detailed description of your experience with the Austin Police Department",
              "ui:widget": "textarea"
            },
            datetime: {
              "ui:title": "Date and time, if known",
              "ui:widget": DateTimeWidget,
              "ui:reviewWidget": DateTimeReviewWidget,
              "ui:options": {
                hideOnReviewIfFalse: true
              }
            },
            location: {
              "ui:title": "Location, if known",
              "ui:widget": LocationPickerWidget,
              "ui:reviewWidget": LocationReviewWidget,
              "ui:options": {
                hideOnReviewIfFalse: true
              }
            }
          }
        }
      }
    },
    officerDetailsChapter: {
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
                    race: {
                      type: "string",
                      enum: [
                        "white",
                        "latino",
                        "black",
                        "asian",
                        "indian",
                        "arab",
                        "native",
                        "hawaiian",
                        "preferNot",
                        "other"
                      ],
                      enumNames: [
                        "White or Euro-American",
                        "Latino or Hispanic American",
                        "Black, Afro-Caribbean, or African American",
                        "East Asian or Asian American",
                        "South Asian or Indian American",
                        "Middle Eastern or Arab American",
                        "Native American or Alaskan Native",
                        "Native Hawaiian or Other Pacific Islander",
                        "Prefer not to say",
                        "Other"
                      ]
                    },
                    otherRace: { type: "string", "ui:collapsed": true },
                    gender: {
                      type: "string",
                      enum: ["male", "female", "nonBinary", "preferNot"],
                      enumNames: [
                        "Male",
                        "Female",
                        "Non-binary",
                        "Prefer not to say"
                      ]
                    },
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
                hideOnReview: true
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
                race: {
                  "ui:title": "Officer Race",
                  "ui:widget": "radio",
                  "ui:options": {
                    hideOnReviewIfFalse: true
                  }
                },
                otherRace: {
                  "ui:title": " ",
                  "ui:options": {
                    expandUnder: "race",
                    expandUnderCondition: "other",
                    hideOnReviewIfFalse: true
                  }
                },
                gender: {
                  "ui:title": "Officer Gender",
                  "ui:widget": "radio",
                  "ui:options": {
                    hideOnReviewIfFalse: true
                  }
                },
                badgeNumber: {
                  "ui:title": "Officer badge number",
                  "ui:options": {
                    hideOnReviewIfFalse: true
                  }
                },
                uniformed: {
                  "ui:title":
                    "Was the officer in uniform or in regular clothes?",
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
                  "ui:title":
                    "Did you see the officer turn their body camera off?",
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
    },
    aboutYouChapter: {
      title: "Tell us about you",
      pages: {
        aboutYou: {
          path: "about-you",
          title: "Tell us about you",
          schema: {
            type: "object",
            properties: {
              "view:textObject": {
                type: "object",
                properties: {}
              },
              race: {
                type: "string",
                enum: [
                  "white",
                  "latino",
                  "black",
                  "asian",
                  "indian",
                  "arab",
                  "native",
                  "hawaiian",
                  "preferNot",
                  "other"
                ],
                enumNames: [
                  "White or Euro-American",
                  "Latino or Hispanic American",
                  "Black, Afro-Caribbean, or African American",
                  "East Asian or Asian American",
                  "South Asian or Indian American",
                  "Middle Eastern or Arab American",
                  "Native American or Alaskan Native",
                  "Native Hawaiian or Other Pacific Islander",
                  "Prefer not to say",
                  "Other"
                ]
              },
              otherRace: { type: "string", "ui:collapsed": true },
              gender: {
                type: "string",
                enum: ["male", "female", "nonBinary", "preferNot"],
                enumNames: ["Male", "Female", "Non-binary", "Prefer not to say"]
              },
              zipCode: { type: "string" },
              "view:contactPreferences": {
                type: "object",
                properties: {
                  willingToBeContacted: { type: "boolean" },
                  wouldLikeToSpeakDirectly: { type: "boolean" }
                }
              }
            }
          },
          uiSchema: {
            "ui:title": "Tell us about you",
            "view:textObject": {
              "ui:description": () => (
                <div>
                  <h2>Demographic information</h2>
                  <p>
                    This information helps us recognize police behavior trends
                    across the City that lead to policy, cultural, and training
                    changes.
                  </p>
                </div>
              )
            },
            race: {
              "ui:title": "Your race",
              "ui:widget": "radio",
              "ui:options": {
                hideOnReviewIfFalse: true
              }
            },
            otherRace: {
              "ui:title": " ",
              "ui:options": {
                expandUnder: "race",
                expandUnderCondition: "other",
                hideOnReviewIfFalse: true
              }
            },
            gender: {
              "ui:title": "Your gender",
              "ui:widget": "radio",
              "ui:options": {
                hideOnReviewIfFalse: true
              }
            },
            zipCode: {
              "ui:title": "Your zip code",
              "ui:options": {
                hideOnReviewIfFalse: true
              }
            },
            "view:contactPreferences": {
              "ui:title": "Contact Preferences",
              willingToBeContacted: {
                "ui:title":
                  "I am willing to be contacted by the Civilian Office of Police Oversight and Accountability",
                "ui:options": {
                  hideOnReviewIfFalse: true
                }
              },
              wouldLikeToSpeakDirectly: {
                "ui:title":
                  "I would like to speak to a Police Department supervisor directly to discuss my complaint.",
                "ui:options": {
                  hideOnReviewIfFalse: true
                }
              }
            }
          }
        }
      }
    },
    howYouFoundUsChapter: {
      title: "Tell us how you found us",
      pages: {
        howYouFoundUs: {
          path: "how-you-found-us",
          title: "Tell us how you found us",
          schema: {
            type: "object",
            properties: {
              howDidYouGetHere: {
                type: "string",
                enum: [
                  "search",
                  "officer",
                  "austindotgov",
                  "apd",
                  "communityorg",
                  "other"
                ],
                enumNames: [
                  "Search engine (Google, Bing, etc.)",
                  "The officer",
                  "Austin.gov",
                  "Email, text, or paper material from Austin Police Department",
                  "Community Organization",
                  "Other"
                ]
              },
              howDidYouGetHereOther: { type: "string", "ui:collapsed": true }
            }
          },
          uiSchema: {
            "ui:title": "Tell us how you found us",
            howDidYouGetHere: {
              "ui:title": "How did you get to this form?",
              "ui:widget": "radio",
              "ui:options": {
                hideOnReviewIfFalse: true
              }
            },
            howDidYouGetHereOther: {
              "ui:title": " ",
              "ui:options": {
                expandUnder: "howDidYouGetHere",
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

export default formConfig;

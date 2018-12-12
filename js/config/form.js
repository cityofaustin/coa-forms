import React from "react";
import Introduction from "../components/Introduction.jsx";
import DateTimeWidget from "../components/DateTimeWidget.jsx";
import LocationPickerWidget from "../components/LocationPickerWidget.jsx";
import FileUploadWidget from "../components/FileUploadWidget.jsx";
import OfficerDetailsDisplayWidget from "../components/OfficerDetailsDisplayWidget.jsx";
import WitnessDetailsDisplayWidget from "../components/WitnessDetailsDisplayWidget.jsx";

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
      title: "Experience Type",
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
              "ui:widget": "radio",
              "ui:options": {
                hideOnReview: true
              }
            }
          }
        }
      }
    },
    beginComplaintChapter: {
      title: "Here’s what to expect",
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
    shareEvidenceChapter: {
      title: "Share your evidence",
      pages: {
        shareEvidence: {
          path: "share-evidence",
          title: "Share your evidence",
          depends: {
            experienceType: "complaint"
          },
          schema: {
            type: "object",
            required: ["awareOfEvidence"],
            properties: {
              awareOfEvidence: {
                type: "boolean",
                enumNames: ["Yes", "No"]
              },
              evidenceFiles: {
                type: "string"
              },
              awareOfMoreEvidence: {
                type: "boolean",
                enumNames: ["Yes", "No"]
              },
              moreEvidence: {
                type: "string"
              }
            }
          },
          uiSchema: {
            "ui:title": "Share your evidence",
            awareOfEvidence: {
              "ui:title":
                "Are you aware of any video, audio, or written evidence? (video files, audio files, photos, police report, hospital record, etc)?",
              "ui:widget": "radio"
            },
            evidenceFiles: {
              "ui:title":
                "Upload any evidence that you have (video files, audio files, photos, police report, hospital record, etc)",
              "ui:options": {
                expandUnder: "awareOfEvidence"
              },
              "ui:widget": FileUploadWidget
              // "ui:widget": "file" - Using a custom widget instead for added functionality
            },
            awareOfMoreEvidence: {
              "ui:title":
                "Do you know of any other evidence that may exist (security camera footage, witness recordings, etc.)?",
              "ui:options": {
                expandUnder: "awareOfEvidence"
              },
              "ui:widget": "radio"
            },
            moreEvidence: {
              "ui:title": "Where could we find that evidence?",
              "ui:options": {
                expandUnder: "awareOfEvidence",
                hideIf: function(formData, index) {
                  return !formData.awareOfMoreEvidence;
                }
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
                    otherRace: { type: "string" },
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
                    otherTransportation: { type: "string" },
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
              "ui:widget": "radio"
            },
            officers: {
              "ui:options": {
                viewField: OfficerDetailsDisplayWidget,
                addable: true,
                expandUnder: "hasOfficerDetails"
              },
              items: {
                name: { "ui:title": "Officer Name" },
                description: { "ui:title": "Officer Description" },
                race: { "ui:title": "Officer Race", "ui:widget": "radio" },
                otherRace: {
                  "ui:title": " ",
                  "ui:options": {
                    expandUnder: "race",
                    expandUnderCondition: "other"
                  }
                },
                gender: { "ui:title": "Officer Gender", "ui:widget": "radio" },
                badgeNumber: { "ui:title": "Officer badge number" },
                uniformed: {
                  "ui:title":
                    "Was the officer in uniform or in regular clothes?",
                  "ui:widget": "radio"
                },
                transportation: {
                  "ui:title":
                    "What kind of car or transportation was the officer in?",
                  "ui:widget": "radio"
                },
                otherTransportation: {
                  "ui:title": " ",
                  "ui:options": {
                    expandUnder: "transportation",
                    expandUnderCondition: "other"
                  }
                },
                turnedOffCamera: {
                  "ui:title":
                    "Did you see the officer turn their body camera off?",
                  "ui:widget": "radio"
                }
              }
            }
          }
        }
      }
    },
    witnessDetailsChapter: {
      title: "Tell us about any witness(es)",
      pages: {
        witnessDetails: {
          path: "witness-details",
          title: "Tell us about any witness(es)",
          depends: {
            experienceType: "complaint"
          },
          schema: {
            type: "object",
            required: ["hasWitnessInformation"],
            properties: {
              hasWitnessInformation: {
                type: "boolean",
                enumNames: ["Yes", "No"]
              },
              witnesses: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    email: { type: "string" },
                    phoneNumber: { type: "string" },
                    zipCode: { type: "string" },
                    anythingElse: { type: "string" }
                  }
                }
              }
            }
          },
          uiSchema: {
            "ui:title": "Tell us about any witness(es)",
            hasWitnessInformation: {
              "ui:title":
                "Do you remember or have access to any details about witness(es) you'd like to share?",
              "ui:widget": "radio"
            },
            witnesses: {
              "ui:options": {
                viewField: WitnessDetailsDisplayWidget,
                addable: true,
                expandUnder: "hasWitnessInformation"
              },
              items: {
                name: { "ui:title": "Witness name" },
                email: { "ui:title": "Witness email" },
                phoneNumber: { "ui:title": "Witness phone number" },
                zipCode: { "ui:title": "Witness zip code" },
                anythingElse: {
                  "ui:title":
                    "Is there anything we should know about this witness?",
                  "ui:widget": "textarea"
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
              otherRace: { type: "string" },
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
            race: { "ui:title": "Your race", "ui:widget": "radio" },
            otherRace: {
              "ui:title": " ",
              "ui:options": {
                expandUnder: "race",
                expandUnderCondition: "other"
              }
            },
            gender: { "ui:title": "Your gender", "ui:widget": "radio" },
            zipCode: { "ui:title": "Your zip code" },
            "view:contactPreferences": {
              "ui:title": "Contact Preferences",
              willingToBeContacted: {
                "ui:title":
                  "I am willing to be contacted by the Civilian Office of Police Oversight and Accountability"
              },
              wouldLikeToSpeakDirectly: {
                "ui:title":
                  "I would like to speak to a Police Department supervisor directly to discuss my complaint."
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
              howDidYouGetHereOther: { type: "string" }
            }
          },
          uiSchema: {
            "ui:title": "Tell us how you found us",
            howDidYouGetHere: {
              "ui:title": "How did you get to this form?",
              "ui:widget": "radio"
            },
            howDidYouGetHereOther: {
              "ui:title": " ",
              "ui:options": {
                expandUnder: "howDidYouGetHere",
                expandUnderCondition: "other"
              }
            }
          }
        }
      }
    }
  }
};

export default formConfig;

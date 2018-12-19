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

import {
  whatHappenedChapter,
  officerDetailsChapter,
  aboutYouChapter,
  howYouFoundUsChapter
} from "@cityofaustin/officer-form-chapters";

const formConfig = {
  title: "Officer Complaint Form",
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
    whatHappenedChapter,
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
                // type: "array",
                // items: { type: "string" }
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
              "ui:widget": "radio",
              "ui:options": {
                hideOnReview: true
              }
            },
            evidenceFiles: {
              "ui:title":
                "Upload any evidence that you have (video files, audio files, photos, police report, hospital record, etc)",
              "ui:options": {
                expandUnder: "awareOfEvidence",
                hideOnReviewIfFalse: true
              },
              "ui:widget": FileUploadWidget,
              // "ui:widget": "file" - Using a custom widget instead for added functionality
              "ui:reviewWidget": FileUploadReviewWidget
            },
            awareOfMoreEvidence: {
              "ui:title":
                "Do you know of any other evidence that may exist (security camera footage, witness recordings, etc.)?",
              "ui:options": {
                expandUnder: "awareOfEvidence",
                hideOnReview: true
              },
              "ui:widget": "radio"
            },
            moreEvidence: {
              "ui:title": "Where could we find evidence?",
              "ui:options": {
                expandUnder: "awareOfEvidence",
                hideIf: function(formData, index) {
                  return !formData.awareOfMoreEvidence;
                },
                hideOnReviewIfFalse: true
              }
            }
          }
        }
      }
    },
    officerDetailsChapter,
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
              "ui:widget": "radio",
              "ui:options": {
                hideOnReview: true
              }
            },
            witnesses: {
              "ui:options": {
                viewField: WitnessDetailsDisplayWidget,
                addable: true,
                expandUnder: "hasWitnessInformation"
              },
              items: {
                name: {
                  "ui:title": "Witness name",
                  "ui:options": {
                    hideOnReviewIfFalse: true
                  }
                },
                email: {
                  "ui:title": "Witness email",
                  "ui:options": {
                    hideOnReviewIfFalse: true
                  }
                },
                phoneNumber: {
                  "ui:title": "Witness phone number",
                  "ui:options": {
                    hideOnReviewIfFalse: true
                  }
                },
                zipCode: {
                  "ui:title": "Witness zip code",
                  "ui:options": {
                    hideOnReviewIfFalse: true
                  }
                },
                anythingElse: {
                  "ui:title":
                    "Is there anything we should know about this witness?",
                  "ui:widget": "textarea",
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
    aboutYouChapter,
    howYouFoundUsChapter
  }
};

export default formConfig;

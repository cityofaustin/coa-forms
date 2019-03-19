import React from "react";

import {
  FileUploadWidget,
  FileUploadReviewWidget
} from "@cityofaustin/usfs-components";

const shareEvidenceChapter = {
  title: "Share your evidence",
  pages: {
    shareEvidence: {
      path: "share-evidence",
      title: "Share your evidence",
      schema: {
        type: "object",
        properties: {
          awareOfEvidence: {
            type: "boolean",
            enumNames: ["Yes", "No"]
          },
          evidenceFiles: {
            type: "string"
          },
        }
      },
      uiSchema: {
        "ui:title": "Share your photos or video",
        awareOfEvidence: {
          "ui:title":
            "Do you have additional information? This could include video, audio, photos, police reports, hospital records, or anything else you want to share.",
            'ui:description': () => (
              <a className="usa-external_link" target="_blank" href="https://alpha.austin.gov/police-oversight/how-we-store-and-use-your-data">How we store and use your information</a>
            ),
          "ui:widget": "radio",
          "ui:options": {
            hideOnReview: true
          }
        },
        evidenceFiles: {
          "ui:title":
            "Upload any evidence that you have (video files, audio files, photos, police report, hospital record, etc.).",
          "ui:options": {
            expandUnder: "awareOfEvidence",
            hideOnReviewIfFalse: true
          },
          "ui:widget": FileUploadWidget,
          // "ui:widget": "file" - Using a custom widget instead for added functionality
          "ui:reviewWidget": FileUploadReviewWidget
        }
      }
    }
  }
};

export default shareEvidenceChapter;

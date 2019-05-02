import React from "react";

import FileUploadWidget from "@cityofaustin/us-forms-system/lib/js/widgets/FileUploadWidget";
import FileUploadReviewWidget from '@cityofaustin/us-forms-system/lib/js/review/FileUploadReviewWidget';

const shareMediaChapter = {
  title: "Share your media",
  pages: {
    shareMedia: {
      path: "share-media",
      title: "Share your media",
      schema: {
        type: "object",
        properties: {
          awareOfMedia: {
            type: "boolean",
            enumNames: ["Yes", "No"]
          },
          mediaFiles: {
            type: "string"
          },
        }
      },
      uiSchema: {
        awareOfMedia: {
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
        mediaFiles: {
          "ui:title":
            "Upload any media that you have (video files, audio files, photos, police report, hospital record, etc.).",
          "ui:options": {
            expandUnder: "awareOfMedia",
            hideOnReviewIfFalse: true
          },
          "ui:widget": FileUploadWidget(process.env.FORM_API_URL),
          // "ui:widget": "file" - Using a custom widget instead for added functionality
          "ui:reviewWidget": FileUploadReviewWidget
        }
      }
    }
  }
};

export default shareMediaChapter;

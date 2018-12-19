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
};

export default shareEvidenceChapter;

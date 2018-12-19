import { WitnessDetailsDisplayWidget } from "@cityofaustin/usfs-components";

const witnessDetailsChapter = {
  title: "Tell us about any witness(es)",
  pages: {
    witnessDetails: {
      path: "witness-details",
      title: "Tell us about any witness(es)",
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
};

export default witnessDetailsChapter;

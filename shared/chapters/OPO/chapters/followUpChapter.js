import React from "react";

import PhoneNumberWidget from "@cityofaustin/us-forms-system/lib/js/widgets/PhoneNumberWidget";
import PhoneNumberReviewWidget from "@cityofaustin/us-forms-system/lib/js/review/PhoneNumberWidget";
import { phoneConfig } from "@cityofaustin/us-forms-system/lib/js/definitions/phone";

const followUpChoice = {
  schema: {
    remainAnonymous: {
      type: "string",
      enum: ["followUp", "remainAnonymous"],
      enumNames: ["Follow up with me", "Remain anonymous"]
    }
  },
  ui: {
    remainAnonymous: {
      "ui:title":
        "Do you want the Office of Police Oversight to follow up with you or would you like to remain anonymous?",
      "ui:widget": "radio",
      "ui:options": {
        hideOnReviewIfFalse: false
      }
    }
  }
};

const followUpChapter = {
  title: "Follow up",
  pages: {
    followUp: {
      path: "follow-up",
      title: "Follow up",
      schema: {
        type: "object",
        properties: {
          "view:contactHeader": {
            type: "object",
            properties: {}
          },
          ...followUpChoice.schema,
          "view:contactPreferences": {
            type: "object",
            properties: {
              yourName: { type: "string" },
              yourPhone: phoneConfig.schema(),
              yourEmail: { type: "string", format: "email" },
              needTranslator: { type: "boolean" }
            }
          },
          "view:infoObject": {
            type: "object",
            properties: {}
          }
        }
      },
      uiSchema: {
        "ui:title": "Follow up",
        ...followUpChoice.ui,
        "view:contactPreferences": {
          "ui:options": {
            expandUnder: "remainAnonymous",
            expandUnderCondition: "followUp"
          },
          yourName: {
            "ui:title": "Your name",
            // conditionally require field
            "ui:required": formData => formData.remainAnonymous === "followUp"
          },
          // Note: i couldn't think of a way to use the previous function from
          // phoneConfig while also adding the required option, so that would be
          // a nice future improvement
          yourPhone: {
            "ui:widget": PhoneNumberWidget,
            "ui:reviewWidget": PhoneNumberReviewWidget,
            "ui:title": "Your phone number",
            "ui:required": formData => formData.remainAnonymous === "followUp",
            "ui:errorMessages": {
              pattern: "Phone numbers must be 10 digits"
            },
            "ui:options": {
              widgetClassNames: "home-phone usfs-input-medium-large",
              inputType: "tel"
            }
          },
          yourEmail: {
            "ui:title": "Your email address",
            "ui:widget": "email",
            "ui:description": "",
            "ui:options": {
              inputType: "email"
            }
          },
          needTranslator: {
            "ui:title":
              "I would like an interpreter for all my future interactions."
          }
        },
        "view:infoObject": {
          "ui:description": () => (
            <p className="usa-font-lead">
              Your complaint will be reviewed even if you remain anonymous.
              However, we will not be able to contact you with any follow-up
              questions or give you any information about the case.
            </p>
          ),
          "ui:options": {
            expandUnder: "remainAnonymous",
            expandUnderCondition: "remainAnonymous"
          }
        }
      }
    }
  }
};

export default followUpChapter;

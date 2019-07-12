import React from "react";
import { raceBlocks, genderBlocks } from "../../../schemaBlocks";

import PhoneNumberWidget from "@cityofaustin/us-forms-system/lib/js/widgets/PhoneNumberWidget";
import PhoneNumberReviewWidget from "@cityofaustin/us-forms-system/lib/js/review/PhoneNumberWidget";
import { phoneConfig } from "@cityofaustin/us-forms-system/lib/js/definitions/phone";

// we need to override this for labels, but need to make deep copys hence the JSON stuff
let yourRace = JSON.parse(JSON.stringify(raceBlocks.ui));
let yourGender = JSON.parse(JSON.stringify(genderBlocks.ui));
debugger;
yourRace.race["ui:title"] = "Your race";
yourGender.gender["ui:title"] = "Your gender";

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
          yourName: { "ui:title": "Your name" },
          yourPhone: phoneConfig.uiSchema("Your phone number"),

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

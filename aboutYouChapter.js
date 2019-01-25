import React from "react";
import { raceBlocks, genderBlocks } from "@cityofaustin/usfs-schema-blocks";

const aboutYouChapter = {
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
          ...genderBlocks.schema,
          ...raceBlocks.schema,
          zipCode: { type: "string" },
          "view:contactPreferences": {
            type: "object",
            properties: {
              willingToBeContacted: { type: "boolean" }
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
This information helps us recognize trends across the City that lead to policy and training recommendations.
              </p>
            </div>
          )
        },
        ...genderBlocks.ui,
        ...raceBlocks.ui,

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
              "I am willing to be contacted by the Office of Police Oversight in two to four business days.",
            "ui:options": {
              hideOnReviewIfFalse: true
            }
          }
        }
      }
    }
  }
};

export default aboutYouChapter;

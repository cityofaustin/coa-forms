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
          ...raceBlocks.schema,
          ...genderBlocks.schema,
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
        ...raceBlocks.ui,
        ...genderBlocks.ui,
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
};

export default aboutYouChapter;

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
          otherRace: { type: "string", "ui:collapsed": true },
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
        race: {
          "ui:title": "Your race",
          "ui:widget": "radio",
          "ui:options": {
            hideOnReviewIfFalse: true
          }
        },
        otherRace: {
          "ui:title": " ",
          "ui:options": {
            expandUnder: "race",
            expandUnderCondition: "other",
            hideOnReviewIfFalse: true
          }
        },
        gender: {
          "ui:title": "Your gender",
          "ui:widget": "radio",
          "ui:options": {
            hideOnReviewIfFalse: true
          }
        },
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

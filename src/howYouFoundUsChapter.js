const howYouFoundUsChapter = {
  title: "Tell us how you found us",
  pages: {
    howYouFoundUs: {
      path: "how-you-found-us",
      title: "Tell us how you found us",
      schema: {
        type: "object",
        properties: {
          howDidYouGetHere: {
            type: "string",
            enum: [
              "search",
              "officer",
              "austindotgov",
              "apd",
              "communityorg",
              "other"
            ],
            enumNames: [
              "Search engine (Google, Bing, etc.)",
              "The officer",
              "Austin.gov",
              "Email, text, or paper material from Austin Police Department",
              "Community Organization",
              "Other"
            ]
          },
          howDidYouGetHereOther: { type: "string", "ui:collapsed": true }
        }
      },
      uiSchema: {
        "ui:title": "Tell us how you found us",
        howDidYouGetHere: {
          "ui:title": "How did you get to this form?",
          "ui:widget": "radio",
          "ui:options": {
            hideOnReviewIfFalse: true
          }
        },
        howDidYouGetHereOther: {
          "ui:title": " ",
          "ui:options": {
            expandUnder: "howDidYouGetHere",
            expandUnderCondition: "other",
            hideOnReviewIfFalse: true
          }
        }
      }
    }
  }
};

export default howYouFoundUsChapter;

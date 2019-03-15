import {
  DateWidget,
  DateReviewWidget,
  TimeWidget,
  TimeReviewWidget,
  LocationPickerWidget,
  LocationReviewWidget
} from "@cityofaustin/usfs-components";

const locationJSON = JSON.stringify({
  address: "800 Guadalupe St, Austin, TX 78701",
  position: { lat: 30.271272, lng: -97.745934 }
});

const whatHappenedChapter = {
  title: "Tell us what happened",
  pages: {
    whatHappened: {
      path: "what-happened",
      title: "Tell us what happened",
      schema: {
        type: "object",
        required: ["description", "date", "time"],
        properties: {
          description: {
            type: "string"
          },
          date: {
            type: "string"
          },
          time: {
            type: "string"
          },
          hasTicket: {
            type: "boolean"
          },
          ticket: {
            type: "string"
          }
        }
      },
      uiSchema: {
        "ui:title": "Tell us what happened",
        description: {
          "ui:title": "Describe your experience with the Austin Police Department.",
          "ui:widget": "textarea"
        },
        date: {
          "ui:title": "What day did it happen?",
          "ui:widget": DateWidget,
          "ui:reviewWidget": DateReviewWidget,
          "ui:options": {
            hideOnReviewIfFalse: true
          }
        },
        time: {
          "ui:title": "What time did it happen?",
          "ui:widget": TimeWidget,
          "ui:reviewWidget": TimeReviewWidget,
          "ui:options": {
            hideOnReviewIfFalse: true
          }
        },
        hasTicket: {
          "ui:title": "I received a ticket during this interaction.",
          "ui:options": {
            hideOnReviewIfFalse: true
          }
        },
        ticket: {
          "ui:title": "Your name as it appears on the ticket",
          "ui:description": "We need your name in order to find the ticket you’re referencing.",
          "ui:help": "Skip this if you prefer to remain anonymous.",
          "ui:options" : {
            expandUnder: 'hasTicket',
            expandUnderCondition: true
          }
        }
      }
    }
  }
};

export default whatHappenedChapter;

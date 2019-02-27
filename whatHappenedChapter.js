import {
  DateTimeWidget,
  DateTimeReviewWidget,
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
        required: ["description", "datetime"],
        properties: {
          description: {
            type: "string"
          },
          datetime: {
            type: "string"
          },
          hasTicket: {
            type: "boolean"
          },
          ticket: {
            type: "string"
          },
          location: {
            type: "string",
            formData: locationJSON
          }
        }
      },
      uiSchema: {
        "ui:title": "Tell us what happened",
        description: {
          "ui:title": "Description",
          "ui:description":
            "Describe your experience with the Austin Police Department.",
          "ui:widget": "textarea"
        },
        datetime: {
          "ui:title": "Date and time, if known?",
          "ui:widget": DateTimeWidget,
          "ui:reviewWidget": DateTimeReviewWidget,
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
        },
        location: {
          "ui:title": "Location",
          "ui:description": "Type in the location or drag the map to the location.",
          "ui:widget": LocationPickerWidget,
          "ui:reviewWidget": LocationReviewWidget,
          "ui:options": {
            hideOnReviewIfFalse: true
          }
        }
      }
    }
  }
};

export default whatHappenedChapter;

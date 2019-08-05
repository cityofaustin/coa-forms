import widgets from "@cityofaustin/us-forms-system/lib/js/widgets";
const { CalendarDateWidget, TimeWidget } = widgets;
import { CalendarDateReviewWidget, TimeReviewWidget } from "@cityofaustin/us-forms-system/lib/js/review/widgets";

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
            type: "object",
            required: ["date", "time"],
            properties: {
              date: {
                type: "string"
              },
              time: {
                type: "string"
              },
            }
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
        datetime: {
          "ui:title": "When did it happen?",
          date: {
            "ui:title": "Date",
            "ui:widget": CalendarDateWidget({validation: "pastOnly"}),
            "ui:errorMessages": {
              required: 'Please enter a valid past date'
            },
            "ui:reviewWidget": CalendarDateReviewWidget,
            "ui:options": {
              hideOnReviewIfFalse: true
            }
          },
          time: {
            "ui:title": "Time",
            "ui:widget": TimeWidget,
            "ui:reviewWidget": TimeReviewWidget,
            "ui:options": {
              hideOnReviewIfFalse: true
            }
          },
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

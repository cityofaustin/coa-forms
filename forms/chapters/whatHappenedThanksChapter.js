
import widgets from "us-forms-system/lib/js/widgets";
const { CalendarDateWidget, TimeWidget } = widgets;
import { CalendarDateReviewWidget, TimeReviewWidget } from "us-forms-system/lib/js/review/widgets";


const whatHappenedThanksChapter = {
  title: "Tell us what happened",
  pages: {
    whatHappened: {
      path: "what-happened",
      title: "Tell us what happened",
      schema: {
        type: "object",
        required: ["description"],
        properties: {
          description: {
            type: "string"
          },
          datetime: {
            type: "object",
            properties: {
              date: {
                type: "string"
              },
              time: {
                type: "string"
              },
            }
          },
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
            "ui:widget": DateWidget,
            "ui:reviewWidget": DateReviewWidget,
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
      }
    }
  }
};

export default whatHappenedThanksChapter;

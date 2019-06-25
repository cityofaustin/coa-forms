import React from 'react';

import widgets from "@cityofaustin/us-forms-system/lib/js/widgets";
import PhoneNumberWidget from '@cityofaustin/us-forms-system/lib/js/widgets/PhoneNumberWidget';
const { CalendarDateWidget, TimeWidget } = widgets;
import { phoneConfig } from '@cityofaustin/us-forms-system/lib/js/definitions/phone';

const chapters = {
  dayLabor: {
    title: "Day Labor",
    pages: {
      dayLabor: {
        path: 'day-labor',
        title: "FIRST WORKERS' DAY LABOR JOB REQUEST",
        schema: {
          type: "object",
          required: [],
          properties: {
            employerInformation: {
              type: "object",
              required: [],
              properties: {
                name: { type: "string" },
                address: { type: "string" },
                city: { type: "string" },
                zipCode: { type: "number" },
                phone: phoneConfig.schema(),
                email: { type: 'string', format: 'email' },
              }
            },
            jobInformation: {
              type: "object",
              required: [],
              properties: {
                datetime: {
                  type: "object",
                  required: ["date", "time"],
                  properties: {
                    date: { type: "string" },
                    time: { type: "string" },
                  }
                },
                numberWorkers: { type: "number" },
                numberHours: { type: "number" },
                hourlyRate: { type: "number" },
                transportation: {
                  type: "string",
                  enum: [
                    'Employer-provided',
                    'Worker-provided',
                  ],
                },
                description: { type: "string" },
              }
            }
          }
        },
        uiSchema: {
          "ui:title": "Looking to hire day labor? Fill out this form and we'll get back to you as soon as possible.",
          employerInformation: {
            "ui:title": "Employer Information",
            name: {
              "ui:title": "Your name"
            },
            address: {
              "ui:title": "Work site address"
            },
            city: {
              "ui:title": "City"
            },
            zipCode: {
              "ui:title": "Zip code"
            },
            phone: {
              ...phoneConfig.uiSchema('Your phone number'),
              "ui:title": "Phone Number",
              "ui:description": "We'll use this number to contact you if we have any questions.",
            },
            email: {
              'ui:title': 'Email address',
              'ui:widget': 'email',
              'ui:options': {
                inputType: 'email',
              },
            }
          },
          jobInformation: {
            datetime: {
              "ui:title": "Date and time for this job",
              date: {
                "ui:title": "Date",
                "ui:widget": CalendarDateWidget,
              },
              time: {
                "ui:title": "Time",
                "ui:widget": TimeWidget,
              },
              numberWorkers: {
                "ui:title": "Number of workers needed"
              },
              numberHours: {
                "ui:title": "Number of hours you expect they'll work"
              },
              hourlyRate: {
                "ui:title": "Hourly pay rate",
                "ui:description": "We recommend that you offer at least $12 an hour",
              },
              transportation: {
                "ui:title": "Transporation",
                'ui:widget': 'radio',
              },
              description: {
                "ui:title": "Describe the job",
                "ui:description": "Carpentry? Installing windows? Landscaping? Give us a sense of the job and what skillsets you're looking for.",
                "ui:widget": "textarea"
              }
            }
          }
        }
      }
    }
  }
}

export default chapters;

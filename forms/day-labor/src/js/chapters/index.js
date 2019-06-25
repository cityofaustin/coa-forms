import React from 'react';

import widgets from "@cityofaustin/us-forms-system/lib/js/widgets";
import PhoneNumberWidget from '@cityofaustin/us-forms-system/lib/js/widgets/PhoneNumberWidget';
import CurrencyWidget from '@cityofaustin/us-forms-system/lib/js/widgets/CurrencyWidget';
const { CalendarDateWidget, TimeWidget } = widgets;
import { CalendarDateReviewWidget, TimeReviewWidget } from "@cityofaustin/us-forms-system/lib/js/review/widgets";
import { phoneConfig } from '@cityofaustin/us-forms-system/lib/js/definitions/phone';
import { currencyConfig } from '@cityofaustin/us-forms-system/lib/js/definitions/currency';


const chapters = {
  dayLabor: {
    title: "Day Labor",
    pages: {
      dayLabor: {
        path: 'form',
        title: "FIRST WORKERS' DAY LABOR JOB REQUEST",
        schema: {
          type: "object",
          required: [],
          properties: {
            employerInformation: {
              type: "object",
              required: [
                "name", "address", "city", "zipCode", "phone"
              ],
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
              required: [
                "date", "time", "numberWorkers", "numberHours", "hourlyRate", "transportation", "description",
              ],
              properties: {
                date: { type: "string" },
                time: { type: "string" },
                numberWorkers: { type: "number" },
                numberHours: { type: "number" },
                hourlyRate: currencyConfig.schema(),
                transportation: {
                  type: "string",
                  enum: [
                    'employerProvided',
                    'workerProvided',
                  ],
                  enumNames: [
                    'Employer provided',
                    'Worker provided'
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
            "ui:title": "Job Information",
            date: {
              "ui:title": "Date for this job",
              "ui:widget": CalendarDateWidget,
              "ui:reviewWidget": CalendarDateReviewWidget,
            },
            time: {
              "ui:title": "Time for this job",
              "ui:widget": TimeWidget,
              "ui:reviewWidget": TimeReviewWidget,
            },
            numberWorkers: {
              "ui:title": "Number of workers needed"
            },
            numberHours: {
              "ui:title": "Number of hours you expect they'll work"
            },
            hourlyRate: {
              ...currencyConfig.uiSchema("Hourly pay rate"),
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

export default chapters;

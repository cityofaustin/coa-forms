import React from 'react';

import widgets from "@cityofaustin/us-forms-system/lib/js/widgets";
import PhoneNumberWidget from '@cityofaustin/us-forms-system/lib/js/widgets/PhoneNumberWidget';
const { CalendarDateWidget, TimeWidget } = widgets;
import { CalendarDateReviewWidget, TimeReviewWidget } from "@cityofaustin/us-forms-system/lib/js/review/widgets";
import { phoneConfig } from '@cityofaustin/us-forms-system/lib/js/definitions/phone';
import { currencyConfig } from '@cityofaustin/us-forms-system/lib/js/definitions/currency';


const chapters = {
  dayLabor: {
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
                "name", "address", "city", "state", "zipCode", "phone"
              ],
              properties: {
                name: { type: "string" },
                organization: { type: "string" },
                address: { type: "string" },
                city: { type: "string" },
                state: {
                  type: "string",
                  enum: [
                    'AL', 'AK', 'AS', 'AZ', 'AR', 'AA', 'AE', 'AP', 'CA', 'CO',
                    'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL',
                    'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI',
                    'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY',
                    'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI',
                    'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV',
                    'WI', 'WY'
                  ]
                },
                zipCode: { type: "string", pattern: '[0-9]{5}((-)?[0-9]{4})?' },
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
                description: { type: "string" },
                date: { type: "string" },
                time: { type: "string" },
                numberWorkers: { type: "number" },
                numberHours: { type: "number" },
                hourlyRate: {
                  type: "object",
                  properties: {
                    hourlyRate: currencyConfig.schema(),
                    recommendRate: { type: "boolean" },
                  }
                },
                transportation: {
                  type: "string",
                  enum: [
                    "I’ll provide transportation from the Day Labor Center to the worksite.",
                    "Workers will need their own transportation.",
                  ],
                },
              }
            }
          }
        },
        uiSchema: {
          employerInformation: {
            "ui:title": "Employer information",
            name: {
              "ui:title": "Your name"
            },
            organization: {
              "ui:title": "Organization"
            },
            address: {
              "ui:title": "Worksite address"
            },
            city: {
              "ui:title": "City"
            },
            state: {
              "ui:title": "State"
            },
            zipCode: {
              "ui:title": "Zip code",
              "ui:errorMessages": {
                pattern: 'Please enter a 5-digit zip code or 9-digit zip+4 code'
              }
            },
            phone: {
              ...phoneConfig.uiSchema('Your phone number'),
              "ui:title": "Phone number",
              "ui:description": "We’ll call you at this number if we have questions.",
            },
            email: {
              'ui:title': 'Email address',
              'ui:widget': 'email',
              'ui:description': "We’ll send you a copy of your request to this email address.",
              'ui:options': {
                inputType: 'email',
              },
            },
          },
          jobInformation: {
            "ui:title": "Job information",
            description: {
              "ui:title": "Describe the job",
              "ui:description": "Explain what the workers will do and the skill sets they’ll need for the job.",
              "ui:widget": "textarea"
            },
            date: {
              "ui:title": "Date",
              "ui:widget": CalendarDateWidget({validation: "futureOnly"}),
              "ui:errorMessages": {
                required: 'Please enter a valid future date'
              },
              "ui:reviewWidget": CalendarDateReviewWidget,
            },
            time: {
              "ui:title": "Start Time",
              "ui:widget": TimeWidget,
              "ui:reviewWidget": TimeReviewWidget,
            },
            numberWorkers: {
              "ui:title": "How many workers do you need?"
            },
            numberHours: {
              "ui:title": "How many hours do you expect each person to work, per day?"
            },
            hourlyRate: {
              hourlyRate: {
                ...currencyConfig.uiSchema("Hourly pay rate"),
              },
              recommendRate: {
                'ui:title': "I'd like a suggestion from First Workers’ staff.",
              },
            },
            transportation: {
              "ui:title": "Transporation",
              'ui:widget': 'radio',
            },
          }
        }
      }
    }
  }
}

export default chapters;

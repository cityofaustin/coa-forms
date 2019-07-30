import React from 'react';

import widgets from '@cityofaustin/us-forms-system/lib/js/widgets';
import PhoneNumberWidget from '@cityofaustin/us-forms-system/lib/js/widgets/PhoneNumberWidget';
import CurrencyWidget from '@cityofaustin/us-forms-system/lib/js/widgets/CurrencyWidget';
const { CalendarDateWidget, TimeWidget } = widgets;
import {
  CalendarDateReviewWidget,
  TimeReviewWidget,
} from '@cityofaustin/us-forms-system/lib/js/review/widgets';
import { phoneConfig } from '@cityofaustin/us-forms-system/lib/js/definitions/phone';
import { currencyConfig } from '@cityofaustin/us-forms-system/lib/js/definitions/currency';

const chapters = {
  compostClass: {
    title: 'Request a composting class',
    pages: {
      classRequest: {
        path: 'form',
        title: 'Class request',
        schema: {
          type: 'object',
          required: [],
          properties: {
            classInformation: {
              type: 'object',
              title: 'Class details',
              required: [],
              properties: {
                bestDateTime: {
                  type: 'object',
                  title: 'Best date & time',
                  required: ['date', 'time'],
                  properties: {
                    date: {
                      type: 'string',
                    },
                    time: {
                      type: 'string',
                    },
                  },
                },
                secondBestDateTime: {
                  type: 'object',
                  title: 'Second choice date & time',
                  required: ['date', 'time'],
                  properties: {
                    date: {
                      type: 'string',
                    },
                    time: {
                      type: 'string',
                    },
                  },
                },
                venueInformation: {
                  type: 'object',
                  title: 'Venue information',
                  required: ['address', 'classLanguages'],
                  properties: {
                    address: { type: 'string' },
                    venueType: {
                      type: 'string',
                      enum: ['indoor', 'outdoor'],
                    },
                    attendanceGoal: {
                      type: 'number',
                    },
                    availableEquipment: {
                      type: 'string',
                      items: {
                        type: 'string',
                        enum: ['projector', 'screen', 'laptop', 'none'],
                      },
                    },
                    isPublicEvent: {
                      type: 'boolean',
                    },
                    classLanguages: {
                      type: 'string',
                      items: {
                        type: 'string',
                        enum: ['English', 'Spanish', 'Bilingual'],
                      },
                    },
                  },
                },
              },
            },
            hostInformation: {
              type: 'object',
              title: 'Contact details',
              required: ['organizationName', 'phone'],
              properties: {
                organizationName: { type: 'string' },
                organizationWebsite: { type: 'string' },
                contactName: { type: 'string' },
                phone: phoneConfig.schema(),
                email: { type: 'string', format: 'email' },
              },
            },
          },
        },
        uiSchema: {
          classInformation: {
            bestDateTime: {
              date: {
                'ui:title': 'Date',
                'ui:widget': CalendarDateWidget({ validation: 'futureOnly' }),
                'ui:errorMessages': {
                  required: 'Please enter a valid future date',
                },
                'ui:reviewWidget': CalendarDateReviewWidget,
                'ui:options': {
                  hideOnReviewIfFalse: true,
                },
              },
              time: {
                'ui:title': 'Time',
                'ui:widget': TimeWidget,
                'ui:reviewWidget': TimeReviewWidget,
                'ui:options': {
                  hideOnReviewIfFalse: true,
                },
              },
            },
            secondBestDateTime: {
              date: {
                'ui:title': 'Date',
                'ui:widget': CalendarDateWidget({ validation: 'futureOnly' }),
                'ui:errorMessages': {
                  required: 'Please enter a valid future date',
                },
                'ui:reviewWidget': CalendarDateReviewWidget,
                'ui:options': {
                  hideOnReviewIfFalse: true,
                },
              },
              time: {
                'ui:title': 'Time',
                'ui:widget': TimeWidget,
                'ui:reviewWidget': TimeReviewWidget,
                'ui:options': {
                  hideOnReviewIfFalse: true,
                },
              },
            },
          },
        },
      },
    },
  },
};
export default chapters;

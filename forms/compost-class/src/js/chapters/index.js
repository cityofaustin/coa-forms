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
                  required: ['date', 'time'],
                  properties: {
                    date: {
                      type: 'string',
                      title: 'Best date',
                    },
                    time: {
                      type: 'string',
                      title: 'Best time',
                    },
                  },
                },
                secondBestDateTime: {
                  type: 'object',
                  required: ['date', 'time'],
                  properties: {
                    date: {
                      type: 'string',
                      title: 'Backup date',
                    },
                    time: {
                      type: 'string',
                      title: 'Backup time',
                    },
                  },
                },
                venueInformation: {
                  type: 'object',
                  required: ['address', 'classLanguages'],
                  properties: {
                    address: { type: 'string' },
                    venueType: {
                      type: 'string',
                      title: 'Please select whether the class is: ',
                      enum: ['indoor', 'outdoor'],
                    },
                    isPublicEvent: {
                      type: 'boolean',
                      title: 'Is this class open to the public?',
                    },
                    attendanceGoal: {
                      type: 'number',
                      title: 'Attendance goal',
                    },
                    availableEquipment: {
                      type: 'object',
                      properties: {
                        Projector: { type: 'boolean' },
                        Screen: { type: 'boolean' },
                        Laptop: { type: 'boolean' },
                      },
                    },
                    'view:classLanguages': {
                      type: 'object',
                      properties: {
                        English: { type: 'boolean' },
                        Spanish: { type: 'boolean' },
                        AmericanSignLanguage: {
                          type: 'boolean',
                          title: 'American Sign Language',
                        },
                      },
                    },
                    otherLanguage: {
                      type: 'string',
                      title: 'Other',
                    },
                    anythingElse: {
                      type: 'string',
                      title: 'Any questions or comments?',
                    },
                  },
                },
              },
            },
            hostInformation: {
              type: 'object',
              title: 'Contact details',
              required: ['contactName', 'phone'],
              properties: {
                contactName: {
                  type: 'string',
                  title: 'Your name',
                },
                phone: phoneConfig.schema(),
                email: {
                  type: 'string',
                  format: 'email',
                  title: 'Email',
                },
                organizationName: { type: 'string' },
                organizationWebsite: { type: 'string' },
              },
            },
          },
        },
        uiSchema: {
          classInformation: {
            bestDateTime: {
              date: {
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
                'ui:widget': TimeWidget,
                'ui:reviewWidget': TimeReviewWidget,
                'ui:options': {
                  hideOnReviewIfFalse: true,
                },
              },
            },
            secondBestDateTime: {
              'ui:title': (
                <label className="schemaform-label">
                  In case we need to reschedule
                </label>
              ),
              date: {
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
                'ui:widget': TimeWidget,
                'ui:reviewWidget': TimeReviewWidget,
                'ui:options': {
                  hideOnReviewIfFalse: true,
                },
              },
            },
            venueInformation: {
              availableEquipment: {
                'ui:title': (
                  <label className="schemaform-label">
                    Available equipment
                  </label>
                ),
                'ui:options': {
                  classNames: 'schemaform-label wee',
                  widgetClassNames: 'schemaform-label waa',
                },
              },
              'view:classLanguages': {
                'ui:title': (
                  <label className="schemaform-label">Language</label>
                ),
                'ui:description': '(check any that apply)',
                'ui:options': {
                  classNames: 'schemaform-label',
                  widgetClassNames: 'schemaform-label',
                },
                otherLanguage: {
                  'ui:title': 'Other',
                },
              },
              address: {
                'ui:title': 'Class location address',
              },
              venueType: {
                'ui:widget': 'radio',
              },
              isPublicEvent: {
                'ui:widget': 'yesNo',
              },
              anythingElse: {
                'ui:title': 'Any questions or comments?',
                'ui:widget': 'textarea',
              },
            },
          },
          hostInformation: {
            email: {
              'ui:title': 'Email address',
              'ui:widget': 'email',
              'ui:description':
                'We’ll send you a copy of your request to this email address.',
              'ui:options': {
                inputType: 'email',
              },
            },
            phone: {
              'ui:title': 'Phone',
            },
            organizationName: {
              'ui:title': 'Organization',
              'ui:description':
                'If you’re requesting a class on an organization’s behalf, please tell us more',
            },
            organizationWebsite: {
              'ui:title': 'Organization website',
            },
          },
        },
      },
    },
  },
};
export default chapters;

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
    title: 'Request a compost class',
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
              title: 'Class information',
              description:
                'Please select the best date and time for your compost class. If there’s a schedule conflict, we’ll get in touch to reschedule.',
              required: [],
              properties: {
                bestDateTime: {
                  type: 'object',
                  required: ['date', 'time'],
                  properties: {
                    date: {
                      type: 'string',
                      title: 'Date',
                    },
                    time: {
                      type: 'string',
                      title: 'Time',
                    },
                  },
                },
                venueInformation: {
                  type: 'object',
                  required: ['address', 'classLanguages'],
                  properties: {
                    address: { type: 'string' },
                    isPublicEvent: {
                      type: 'boolean',
                      title: 'This class will be open to the public.',
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
                organizationName: {
                  type: 'string',
                  description:
                    'Please fill in if you’re requesting a class on behalf of an organization.',
                },
                organizationWebsite: { type: 'string' },
              },
            },
          },
        },
        uiSchema: {
          classInformation: {
            'ui:description': 'Please select the best date and time for your compost class. If there’s a schedule conflict, we’ll get in touch to reschedule.',
            bestDateTime: {
              'ui:title': (
                <label className="schemaform-label">Best class date and time</label>
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
                'ui:description': 'Check any that apply. If our staff is not fluent in your preferred language, we can provide interpreters.',
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
              'ui:description': 'Please fill in if you’re requesting a class on behalf of an organization.',
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

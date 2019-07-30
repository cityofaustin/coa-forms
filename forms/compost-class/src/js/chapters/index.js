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
              required: [],
              properties: {
                name: { type: 'string' },
                bestDateTime: {
                  type: 'object',
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
                venueType: {
                  type: 'radio',
                  enum: [
                    'indoor',
                    'outdoor',
                  ]
                },
                attendanceGoal: {
                  type: 'number',
                },

                isPublicEvent: {
                  type: 'boolean',
                },

                organization: { type: 'string' },
                address: { type: 'string' },
                city: { type: 'string' },
                phone: phoneConfig.schema(),
                email: { type: 'string', format: 'email' },
              },
            },
          },
        },
      },
    },
  },
};

// const chapters = {
//   compostClass: {
//     title: 'Request a composting class',
//     pages: {
//       classRequest: {
//         path: 'form',
//         title: 'Class details',
//         schema: {
//           type: 'object',
//           required: [],
//           properties: {
//             classDetails: {
//               type: 'object',
//               required: [],
//               properties: {
//                 bestDateTime: {
//                   type: 'object',
//                   required: ['date', 'time'],
//                   properties: {
//                     date: {
//                       type: 'string',
//                     },
//                     time: {
//                       type: 'string',
//                     },
//                   },
//                 },
//                 secondBestDateTime: {
//                   type: 'object',
//                   required: ['date', 'time'],
//                   properties: {
//                     date: {
//                       type: 'string',
//                     },
//                     time: {
//                       type: 'string',
//                     },
//                   },
//                 },
//                 address: {
//                   type: 'string',
//                 },
//                 venueType: {
//                   type: 'boolean',
//                 },
//                 attendanceGoal: {
//                   type: 'number',
//                 },
//                 availableEquipment: {
//                   type: 'array',
//                   items: {
//                     type: 'string',
//                     enum: ['projector', 'screen', 'laptop', 'none'],
//                   },
//                 },
//                 isPublicEvent: {
//                   type: 'boolean',
//                 },
//                 classLanguages: {
//                   type: 'array',
//                   items: {
//                     type: 'string',
//                     enum: ['English', 'Spanish', 'Bilingual'],
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//   },
// };

export default chapters;

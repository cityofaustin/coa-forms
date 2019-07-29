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
      classDetails: {
        path: 'form',
        title: 'Class details',
        schema: {
          title: 'A list of tasks',
          type: 'object',
          required: ['title'],
          properties: {
            title: {
              type: 'string',
              title: 'Task list title',
            },
            tasks: {
              type: 'array',
              title: 'Tasks',
              items: {
                type: 'object',
                required: ['title'],
                properties: {
                  title: {
                    type: 'string',
                    title: 'Title',
                    description: 'A sample title',
                  },
                  details: {
                    type: 'string',
                    title: 'Task details',
                    description: 'Enter the task details',
                  },
                  done: {
                    type: 'boolean',
                    title: 'Done?',
                    default: false,
                  },
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

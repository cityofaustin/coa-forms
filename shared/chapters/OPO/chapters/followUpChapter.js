import React from 'react';
import { raceBlocks, genderBlocks } from '../../../schemaBlocks';

import PhoneNumberWidget from '@cityofaustin/us-forms-system/lib/js/widgets/PhoneNumberWidget';
import PhoneNumberReviewWidget from '@cityofaustin/us-forms-system/lib/js/review/PhoneNumberWidget';
import { phoneConfig } from '@cityofaustin/us-forms-system/lib/js/definitions/phone';

// we need to override this for labels, but need to make deep copys hence the JSON stuff
let yourRace = JSON.parse(JSON.stringify(raceBlocks.ui));
let yourGender = JSON.parse(JSON.stringify(genderBlocks.ui));

yourRace.race['ui:title'] = 'Your race';
yourGender.gender['ui:title'] = 'Your gender';

const aboutYouChapter = {
  title: 'Follow up',
  pages: {
    aboutYou: {
      path: 'follow-up',
      title: 'Follow up',
      schema: {
        type: 'object',
        properties: {
          'view:contactHeader': {
            type: 'object',
            properties: {},
          },
          willingToBeContacted: { type: 'boolean' },
          'view:contactPreferences': {
            type: 'object',
            properties: {
              yourName: { type: 'string' },
              yourPhone: phoneConfig.schema(),
              yourEmail: { type: 'string', format: 'email' },
              needTranslator: { type: 'boolean' },
            },
          },
        },
      },
      uiSchema: {
        'view:contactHeader': {
          'ui:title': 'Contact preferences',
        },

        willingToBeContacted: {
          'ui:title':
            'I am willing to be contacted by the Office of Police Oversight in 2 to 4 business days.',
          'ui:options': {
            hideOnReviewIfFalse: true,
          },
        },
        'view:contactPreferences': {
          'ui:options': {
            hideIf: formData => !formData.willingToBeContacted,
          },
          yourName: { 'ui:title': 'Your name' },
          yourPhone: phoneConfig.uiSchema('Your phone number'),

          yourEmail: {
            'ui:title': 'Your email address',
            'ui:widget': 'email',
            'ui:description': '',
            'ui:options': {
              inputType: 'email',
            },
          },
          needTranslator: {
            'ui:title':
              'I would like an interpreter for all my future interactions.',
          },
        },
      },
    },
  },
};

export default aboutYouChapter;

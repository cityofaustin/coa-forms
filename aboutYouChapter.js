import React from 'react';
import { raceBlocks, genderBlocks } from '@cityofaustin/usfs-schema-blocks';

import PhoneNumberWidget from 'us-forms-system/lib/js/widgets/PhoneNumberWidget';
import PhoneNumberReviewWidget from 'us-forms-system/lib/js/review/PhoneNumberWidget';

// we need to override this for labels, but need to make deep copys hence the JSON stuff
let yourRace = JSON.parse(JSON.stringify(raceBlocks.ui));
let yourGender = JSON.parse(JSON.stringify(genderBlocks.ui));

yourRace.race['ui:title'] = 'Your race';
yourGender.gender['ui:title'] = 'Your gender';

const aboutYouChapter = {
  title: 'Tell us about you (optional)',
  pages: {
    aboutYou: {
      path: 'about-you',
      title: 'Tell us about you',
      schema: {
        type: 'object',
        properties: {
          'view:infoObject': {
            type: 'object',
            properties: {},
          },
          ...genderBlocks.schema,
          ...raceBlocks.schema,
          zipCode: { type: 'number' },
          'view:contactHeader': {
            type: 'object',
            properties: {},
          },
          willingToBeContacted: { type: 'boolean' },
          'view:contactPreferences': {
            type: 'object',
            properties: {
              yourName: { type: 'string' },
              yourPhone: { type: 'string' },
              yourEmail: { type: 'string' },
              needTranslator: { type: 'boolean' },
            },
          },
        },
      },
      uiSchema: {
        'ui:title': 'Tell us about you',
        'view:infoObject': {
          'ui:description': () => (
            <div className="usa-alert  usa-alert-info">
              <div className="usa-alert-body">
                <h2 className="usa-alert-heading">Demographic information</h2>
                <p className="usa-alert-text">
                  This information helps us recognize trends across the City
                  that lead to policy and training recommendations.
                </p>
              </div>
            </div>
          ),
        },
        ...yourGender,
        ...yourRace,
        zipCode: {
          'ui:title': 'Your zip code',
          'ui:options': {
            hideOnReviewIfFalse: true,
          },
        },
        'view:contactHeader': {
          'ui:title': 'Contact preferences',
        },

        willingToBeContacted: {
          'ui:title':
            'I am willing to be contacted by the Office of Police Oversight in two to four business days.',
          'ui:options': {
            hideOnReviewIfFalse: true,
          },
        },
        'view:contactPreferences': {
          'ui:options': {
            hideIf: formData => !formData.willingToBeContacted,
          },
          yourName: { 'ui:title': 'Your name' },
          yourPhone: {
            'ui:title': 'Your phone number',
            'ui:widget': PhoneNumberWidget,
            'ui:reviewWidget': PhoneNumberReviewWidget,
            'ui:options': {
              inputType: 'tel',
            },
          },
          yourEmail: {
            'ui:title': 'Your email address',
            'ui:widget': 'email',
            'ui:description':
              'Required if you want the case number confirmation sent to your email.',
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

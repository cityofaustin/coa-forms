import React from 'react';
import { raceBlocks, genderBlocks } from '../../../schemaBlocks';

const officerDetailsChapter = {
  title: 'Tell us about the officer(s)',
  pages: {
    hasOfficerDetails: {
      path: 'has-officer-details',
      title: 'Tell us about the officer(s)',
      depends: (formData) => {
        return !window.location.pathname.includes("review-and-submit");
      },
      schema: {
        type: 'object',
        properties: {
          hasOfficerDetails: {
            type: 'boolean',
            enumNames: ['Yes', 'No'],
          },
        },
      },
      uiSchema: {
        'ui:title': 'Tell us about the officer(s)',
        hasOfficerDetails: {
          'ui:title':
            'Do you remember any details about the officer(s) you’d like to share?',
          'ui:widget': 'radio',
          'ui:options': {
            classNames: 'big-button-radio',
          },
        },
      },
    },    
    officerDetails: {
      path: 'officer-details',
      title: 'Tell us about the officer(s)',
      depends: {
        hasOfficerDetails: true
      },
      schema: {
        type: 'object',
        properties: {
          officers: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                physicalDescription: { type: 'string' },
                ...raceBlocks.schema,
                ...genderBlocks.schema,
                badgeNumber: {
                  type: 'number',
                },
                uniformed: {
                  type: 'boolean',
                  enumNames: ['Uniform', 'Regular clothes'],
                },
                transportation: {
                  type: 'string',
                  enum: [
                    'patrol',
                    'unmarked',
                    'horse',
                    'bicycle',
                    'foot',
                    'unknown',
                  ],
                  enumNames: [
                    'Patrol car or motorcycle',
                    'Unmarked car or motorcycle',
                    'Horse',
                    'Bicycle',
                    'On foot',
                    "I don't know",
                  ],
                },
                otherTransportation: {
                  type: 'string',
                  'ui:collapsed': true,
                },
              },
            },
          },
        },
      },
      uiSchema: {
        'ui:title': 'Tell us about the officer(s)',
        hasOfficerDetails: {
          'ui:title':
            'Do you remember any details about the officer(s) you’d like to share?',
          'ui:widget': 'radio',
          'ui:options': {
            hideOnReview: false,
            classNames: 'big-button-radio',
          },
        },
        officers: {
          'ui:options': {
            viewField: () => <div />,
            addable: true,
            itemName: 'officer',
          },
          items: {
            name: {
              'ui:title': 'Name',
              'ui:options': {
                hideOnReviewIfFalse: true,
              },
            },
            physicalDescription: {
              'ui:title': 'Physical description',
              'ui:description':
                'Examples: hair color, eye color, weight, height, facial hair, tattoos, scars, etc.',
              'ui:options': {
                hideOnReviewIfFalse: true,
              },
            },
            ...raceBlocks.ui,
            ...genderBlocks.ui,
            badgeNumber: {
              'ui:title': 'Badge number',
              'ui:options': {
                hideOnReviewIfFalse: true,
              },
            },
            uniformed: {
              'ui:title': 'What was the officer wearing?',
              'ui:widget': 'radio',
              'ui:options': {
                hideOnReviewIfFalse: true,
              },
            },
            transportation: {
              'ui:title':
                'What kind of car or transportation was the officer using?',
              'ui:widget': 'radio',
              'ui:options': {
                hideOnReviewIfFalse: true,
              },
            },
            otherTransportation: {
              'ui:title': ' ',
              'ui:options': {
                expandUnder: 'transportation',
                expandUnderCondition: 'other',
                hideOnReviewIfFalse: true,
              },
            },
          },
        },
      },
    },
  },
};

export default officerDetailsChapter;

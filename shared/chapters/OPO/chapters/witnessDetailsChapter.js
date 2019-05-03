import React from 'react';
import { /* webpackPrefetch: true */ phoneConfig } from '@cityofaustin/us-forms-system/lib/js/definitions/phone';

const witnessDetailsChapter = {
  title: 'Tell us about any witnesses',
  pages: {
    witnessDetails: {
      path: 'witness-details',
      title: 'Tell us about any witnesses',
      schema: {
        type: 'object',
        properties: {
          hasWitnessInformation: {
            type: 'boolean',
            enumNames: ['Yes', 'No'],
          },
          witnesses: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                email: { type: 'string', format: 'email' },
                phoneNumber: phoneConfig.schema(),
                anythingElse: { type: 'string' },
              },
            },
          },
        },
      },
      uiSchema: {
        'ui:title': 'Tell us about any witnesses',
        hasWitnessInformation: {
          'ui:title':
            'Do you remember any details about witness(es) you’d like to share?',
          'ui:widget': 'radio',
          'ui:options': {
            hideOnReview: true,
          },
        },
        witnesses: {
          'ui:options': {
            viewField: () => <div />,
            addable: true,
            expandUnder: 'hasWitnessInformation',
            itemName: 'witness',
          },
          items: {
            name: {
              'ui:title': 'Name',
              'ui:options': {
                hideOnReviewIfFalse: true,
              },
            },
            email: {
              'ui:widget': 'email',
              'ui:title': 'Email',
              'ui:options': {
                hideOnReviewIfFalse: true,
                inputType: 'email',
              },
            },
            phoneNumber: phoneConfig.uiSchema(),
            anythingElse: {
              'ui:title':
                'Is there anything we should know about this witness?',
              'ui:description':
                'Examples: were they injured, were they harassed, how were they involved, etc.',
              'ui:widget': 'textarea',
              'ui:options': {
                hideOnReviewIfFalse: true,
              },
            },
          },
        },
      },
    },
  },
};

export default witnessDetailsChapter;

import { WitnessDetailsDisplayWidget } from '@cityofaustin/usfs-components';

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
                email: { type: 'string' },
                phoneNumber: { type: 'string' },
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
            viewField: WitnessDetailsDisplayWidget,
            addable: true,
            expandUnder: 'hasWitnessInformation',
          },
          items: {
            name: {
              'ui:title': 'Name',
              'ui:options': {
                hideOnReviewIfFalse: true,
              },
            },
            email: {
              'ui:title': 'Email',
              'ui:options': {
                hideOnReviewIfFalse: true,
              },
            },
            phoneNumber: {
              'ui:title': 'Phone number',
              'ui:options': {
                hideOnReviewIfFalse: true,
              },
            },
            anythingElse: {
              'ui:title':
                'Is there anything we should know about this witness?',
              'ui:description':
                'Examples: Examples: were they injured, were they harassed, how were they involved, etc.',
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

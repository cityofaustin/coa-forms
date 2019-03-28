import {
  LocationPickerWidget,
  LocationReviewWidget,
} from '@cityofaustin/usfs-components';

const locationJSON = JSON.stringify({
  address: '800 Guadalupe St, Austin, TX 78701',
  position: { lat: 30.271272, lng: -97.745934 },
});

const whereHappenedChapter = {
  title: 'Where were you?',
  pages: {
    whereHappened: {
      path: 'where-happened',
      title: 'Location',

      schema: {
        type: 'object',
        required: ["location"],
        properties: {
          location: {
            type: 'string',
            formData: locationJSON,
          },
        },
      },
      uiSchema: {
        'ui:title': 'Where were you?',
        location: {
          'ui:title': 'Type in the location or drag the map to the location.',
          'ui:widget': LocationPickerWidget,
          'ui:reviewWidget': LocationReviewWidget,
          'ui:options': {
            hideOnReviewIfFalse: true,
          },
        },
      },
    },
  },
};

export default whereHappenedChapter;

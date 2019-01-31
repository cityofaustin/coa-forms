import React from 'react';
import Introduction from '../components/Introduction.jsx';
import Confirmation from '../components/Confirmation.jsx';

import {
  whatHappenedChapter,
  officerDetailsChapter,
  aboutYouChapter,
  shareEvidenceChapter,
  witnessDetailsChapter,
} from './chapters';

const formConfig = {
  title: 'File a complaint',
  subTitle: '',
  formId: '',
  urlPrefix: '/',
  trackingPrefix: 'form-',
  transformForSubmit: '',
  submitUrl: '',
  introduction: Introduction,
  confirmation: Confirmation,
  defaultDefinitions: {},
  openAllChaptersOnReview: true,
  hideNavArrows: true,
  chapters: {
    whatHappenedChapter,
    shareEvidenceChapter,
    officerDetailsChapter,
    witnessDetailsChapter,
    aboutYouChapter,
  },
};

export default formConfig;

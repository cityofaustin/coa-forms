import React from "react";

import {
  whatHappenedChapter,
  officerDetailsChapter,
  aboutYouChapter,
  howYouFoundUsChapter,
  shareEvidenceChapter,
  witnessDetailsChapter
} from "../src";

const formConfig = {
  title: "📚",
  subTitle: "",
  formId: "",
  urlPrefix: "/",
  trackingPrefix: "form-",
  transformForSubmit: "",
  submitUrl: "",
  confirmation: "",
  defaultDefinitions: {},
  chapters: {
    whatHappenedChapter,
    shareEvidenceChapter,
    officerDetailsChapter,
    witnessDetailsChapter,
    aboutYouChapter,
    howYouFoundUsChapter
  }
};

export default formConfig;

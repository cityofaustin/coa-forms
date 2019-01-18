import React from "react";
import Introduction from "../components/Introduction.jsx";

import {
  whatHappenedChapter,
  officerDetailsChapter,
  aboutYouChapter,
  howYouFoundUsChapter,
  shareEvidenceChapter,
  witnessDetailsChapter
} from "@cityofaustin/officer-form-chapters";

const formConfig = {
  title: "File a complaint",
  subTitle: "",
  formId: "",
  urlPrefix: "/",
  trackingPrefix: "form-",
  transformForSubmit: "",
  submitUrl: "",
  introduction: Introduction,
  confirmation: "",
  defaultDefinitions: {},
  openAllChaptersOnReview: true,
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

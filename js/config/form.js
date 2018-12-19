import React from "react";
import Introduction from "../components/Introduction.jsx";

import {
  DateTimeWidget,
  DateTimeReviewWidget,
  LocationPickerWidget,
  LocationReviewWidget,
  FileUploadWidget,
  FileUploadReviewWidget,
  OfficerDetailsDisplayWidget,
  WitnessDetailsDisplayWidget
} from "@cityofaustin/usfs-components";

import {
  whatHappenedChapter,
  officerDetailsChapter,
  aboutYouChapter,
  howYouFoundUsChapter
} from "@cityofaustin/officer-form-chapters";

const formConfig = {
  title: "Officer Thanks Form",
  subTitle: "",
  formId: "",
  urlPrefix: "/",
  trackingPrefix: "form-",
  transformForSubmit: "",
  submitUrl: "",
  introduction: Introduction,
  confirmation: "",
  defaultDefinitions: {},
  chapters: {
    whatHappenedChapter,
    officerDetailsChapter,
    aboutYouChapter,
    howYouFoundUsChapter
  }
};

export default formConfig;

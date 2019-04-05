const genderBlocks = {
  schema: {
    gender: {
      type: "string",
      enum: ["male", "female", "nonBinary", "preferNot"],
      enumNames: ["Male", "Female", "Non-binary", "Prefer not to say"]
    }
  },
  ui: {
    gender: {
      "ui:title": "Gender",
      "ui:widget": "radio",
      "ui:options": {
        hideOnReviewIfFalse: true
      }
    }
  }
};

export default genderBlocks;

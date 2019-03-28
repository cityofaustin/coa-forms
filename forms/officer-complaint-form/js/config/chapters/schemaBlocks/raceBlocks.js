const raceBlocks = {
  schema: {
    race: {
      type: 'string',
      enum: [
        'white',
        'latino',
        'black',
        'asian',
        'indian',
        'arab',
        'native',
        'hawaiian',
        'preferNot',
        'other'
      ],
      enumNames: [
        'White or Euro-American',
        'Latino or Hispanic American',
        'Black, Afro-Caribbean, or African American',
        'East Asian or Asian American',
        'South Asian or Indian American',
        'Middle Eastern or Arab American',
        'Native American or Alaskan Native',
        'Native Hawaiian or Other Pacific Islander',
        'Prefer not to say',
        'Other'
      ]
    },
    otherRace: { type: 'string', 'ui:collapsed': true }
  },
  ui: {
    race: {
      'ui:placeholder': '- Select race -',
      'ui:title': 'Race',
      'ui:options': {
        hideOnReviewIfFalse: true
      }
    },
    otherRace: {
      'ui:title': ' ',
      'ui:options': {
        expandUnder: 'race',
        expandUnderCondition: 'other',
        hideOnReviewIfFalse: true
      }
    }
  }
}

export default raceBlocks

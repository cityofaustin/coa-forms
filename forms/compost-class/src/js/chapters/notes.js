
const chapters = {
  compostClass: {
    title: 'Request a composting class',
    pages: {
      classRequest: {
        path: 'form',
        title: 'Class details',
        schema: {
          type: 'object',
          required: [],
          properties: {
            classDetails: {
              type: 'object',
              required: [],
              properties: {
                bestDateTime: {
                  type: 'object',
                  required: ['date', 'time'],
                  properties: {
                    date: {
                      type: 'string',
                    },
                    time: {
                      type: 'string',
                    },
                  },
                },
                secondBestDateTime: {
                  type: 'object',
                  required: ['date', 'time'],
                  properties: {
                    date: {
                      type: 'string',
                    },
                    time: {
                      type: 'string',
                    },
                  },
                },
                address: {
                  type: 'string',
                },
                venueType: {
                  type: 'boolean',
                },
                attendanceGoal: {
                  type: 'number',
                },
                availableEquipment: {
                  type: 'array',
                  items: {
                    type: 'string',
                    enum: ['projector', 'screen', 'laptop', 'none'],
                  },
                },
                isPublicEvent: {
                  type: 'boolean',
                },
                classLanguages: {
                  type: 'array',
                  items: {
                    type: 'string',
                    enum: ['English', 'Spanish', 'Bilingual'],
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

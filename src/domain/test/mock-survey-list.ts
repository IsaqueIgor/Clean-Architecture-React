import faker from 'faker';

import { SurveyModel } from '../models';

export const mockSurveyListModel = (): SurveyModel[] => [
  {
    id: faker.random.uuid(),
    question: faker.random.words(),
    answers: [
      {
        image: faker.internet.url(),
        answer: faker.random.words(4),
      },
      {
        answer: faker.random.words(5),
      },
      {
        image: faker.internet.url(),
        answer: faker.random.words(6),
      },
    ],
    date: faker.date.recent(),
    didAnswer: faker.random.boolean(),
  },
];

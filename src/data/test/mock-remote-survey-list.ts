import faker from 'faker';
import { RemoteLoadSurveyList } from '@/data/userCases/load-survey-list/remote-load-survey-list';

export const mockRemoteSurveyModel = (): RemoteLoadSurveyList.Model => ({
  id: faker.random.uuid(),
  question: faker.random.words(),
  date: faker.date.recent().toISOString(),
  didAnswer: faker.random.boolean(),
});

export const mockRemoteSurveyListModel = (): RemoteLoadSurveyList.Model[] => [
  mockRemoteSurveyModel(),
  mockRemoteSurveyModel(),
  mockRemoteSurveyModel(),
];

import faker from 'faker';

import { LoadSurveyList } from '../userCases';

export const mockSurveyModel = (): LoadSurveyList.Model => ({
  id: faker.random.uuid(),
  question: faker.random.words(),
  date: faker.date.recent(),
  didAnswer: faker.random.boolean(),
});

export const mockSurveyListModel = (): LoadSurveyList.Model[] => [
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel(),
];

export class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0;

  surveys = mockSurveyListModel();

  async loadAll(): Promise<LoadSurveyList.Model[]> {
    this.callsCount += 1;
    return this.surveys;
  }
}

import React from 'react';

import {
  render,
  screen,
  waitFor,
  fireEvent
} from '@testing-library/react';
import { SurveyList } from '@/presentation/pages';
import { LoadSurveyList } from '@/domain/userCases';
import { SurveyModel } from '@/domain/models';
import { mockSurveyListModel } from '@/domain/test';
import { UnexpectedError } from '@/domain/errors';

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0;

  surveys = mockSurveyListModel();

  async loadAll(): Promise<SurveyModel[]> {
    this.callsCount += 1;
    return this.surveys;
  }
}

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy;
};

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  render(<SurveyList loadSurveyList={loadSurveyListSpy} />);

  return {
    loadSurveyListSpy,
  };
};

describe('SurveyList Component', () => {
  test('Should present 4 empty items on start', async () => {
    makeSut();
    const surveyList = screen.getByTestId('survey-list');
    expect(surveyList.querySelectorAll('li:empty').length).toBe(4);
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
    await waitFor(() => surveyList);
  });

  test('Should call LoadSurveylist', async () => {
    const { loadSurveyListSpy } = makeSut();
    expect(loadSurveyListSpy.callsCount).toBe(1);
    await waitFor(() => screen.getByText('Surveys'));
  });

  test('Should render SurveyItems on Success', async () => {
    makeSut();
    const surveyList = screen.getByTestId('survey-list');
    await waitFor(() => surveyList);
    expect(surveyList.querySelectorAll('li.surveyItemWrap').length).toBe(3);
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
  });

  test('Should render error on Failure', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();
    const error = new UnexpectedError();
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error);
    makeSut(loadSurveyListSpy);
    await waitFor(() => screen.getByText('Surveys'));
    expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument();
    expect(screen.getByTestId('error')).toHaveTextContent(error.message);
  });

  test('Should call LoadSurveyList on reload', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();
    const error = new UnexpectedError();
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error);
    makeSut(loadSurveyListSpy);
    await waitFor(() => screen.getByText('Surveys'));
    expect(screen.queryByTestId('reload')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('reload'));
    expect(loadSurveyListSpy.callsCount).toBe(1);
    await waitFor(() => screen.getByText('Surveys'));
  });
});

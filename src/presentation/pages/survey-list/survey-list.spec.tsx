import React from 'react';

import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { SurveyList } from '@/presentation/pages';
import { LoadSurveyListSpy, mockAccountModel } from '@/domain/test';
import { ApiContext } from '@/presentation/contexts';
import { Router } from 'react-router-dom';
import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import { AccountModel } from '@/domain/models';

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy;
  setCurrentAccountMock: (account: AccountModel) => void;
};

const history = createMemoryHistory({ initialEntries: ['/'] });

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  const setCurrentAccountMock = jest.fn();
  render(
    <ApiContext.Provider value={{
      setCurrentAccount: setCurrentAccountMock,
      getCurrentAccount: () => mockAccountModel()
    }}
    >
      <Router history={createMemoryHistory()}>
        <SurveyList loadSurveyList={loadSurveyListSpy} />
      </Router>
    </ApiContext.Provider>
  );

  return {
    loadSurveyListSpy,
    setCurrentAccountMock
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

  test('Should render error on Unexpected Error', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();
    const error = new UnexpectedError();
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(error);
    makeSut(loadSurveyListSpy);
    await waitFor(() => screen.getByText('Surveys'));
    expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument();
    expect(screen.getByTestId('error')).toHaveTextContent(error.message);
  });

  test('Should logout on AccessDeniedError', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();
    jest.spyOn(loadSurveyListSpy, 'loadAll').mockRejectedValueOnce(new AccessDeniedError());
    const { setCurrentAccountMock } = makeSut(loadSurveyListSpy);
    await waitFor(() => screen.getByText('Surveys'));
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined);
    expect(history.location.pathname).toBe('/');
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

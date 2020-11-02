import React from 'react';

import { Header } from '@/presentation/components';
import { fireEvent, render, screen } from '@testing-library/react';
import { ApiContext } from '@/presentation/contexts';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Authentication } from '@/domain/userCases';

const history = createMemoryHistory({ initialEntries: ['/'] });

type SutTypes = {
  setCurrentAccountMock: (account: Authentication.Model) => void;
}

const makeSut = (): SutTypes => {
  const setCurrentAccountMock = jest.fn();
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router history={history}>
        <Header />
      </Router>
    </ApiContext.Provider>
  );

  return {
    setCurrentAccountMock
  };
};

describe('Header Component', () => {
  test('should call setCurrentAccount with null', () => {
    const { setCurrentAccountMock } = makeSut();
    fireEvent.click(screen.getByTestId('logout'));
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined);
    expect(history.location.pathname).toBe('/login');
  });
});

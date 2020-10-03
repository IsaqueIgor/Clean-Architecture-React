import React from 'react';

import { render, RenderResult } from '@testing-library/react';
import { Helper } from '@/presentation/test';

import SignUp from './signup';

type SutTypes = {
  sut: RenderResult;
};

const makeSut = (): SutTypes => {
  const sut = render(<SignUp />);
  return {
    sut,
  };
};

describe('SignUp Component', () => {
  test('Should start with initial stated', () => {
    const validationError = 'Required Field';
    const { sut } = makeSut();
    Helper.testChildCount(sut, 'error-wrap', 0);
    Helper.testButtonIsDisabled(sut, 'submit', true);
    Helper.testStatusForField(sut, 'name', validationError);
    Helper.testStatusForField(sut, 'email', validationError);
    Helper.testStatusForField(sut, 'password', validationError);
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError);
  });
});

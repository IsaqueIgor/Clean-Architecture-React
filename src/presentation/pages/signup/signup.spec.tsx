import React from 'react';

import faker from 'faker';
import { render, RenderResult, cleanup } from '@testing-library/react';
import { Helper, ValidationStub } from '@/presentation/test';
import { populateField } from '@/presentation/test/form-helper';

import SignUp from './signup';

type SutTypes = {
  sut: RenderResult;
};

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;
  const sut = render(<SignUp validation={validationStub} />);
  return {
    sut,
  };
};

describe('SignUp Component', () => {
  afterEach(cleanup);

  test('Should start with initial stated', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    Helper.testChildCount(sut, 'error-wrap', 0);
    Helper.testButtonIsDisabled(sut, 'submit', true);
    Helper.testStatusForField(sut, 'name', validationError);
    Helper.testStatusForField(sut, 'email', 'Required Field');
    Helper.testStatusForField(sut, 'password', 'Required Field');
    Helper.testStatusForField(sut, 'passwordConfirmation', 'Required Field');
  });

  test('Should show name error if Validation Fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    populateField(sut, 'name');
    Helper.testStatusForField(sut, 'name', validationError);
  });
});

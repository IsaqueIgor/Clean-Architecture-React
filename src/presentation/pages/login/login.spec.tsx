import React from 'react';
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import Login from './login';
import { ValidationStub } from '@/presentation/test';
import faker from 'faker';

type SutTypes = {
  sut: RenderResult;
  validationSpy: ValidationStub;
};

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationStub();
  validationSpy.errorMessage = faker.random.words();
  const sut = render(<Login validation={validationSpy} />);
  return {
    sut,
    validationSpy,
  };
};

describe('Login Component', () => {
  afterEach(cleanup);

  test('Should start with initial state', () => {
    const { sut } = makeSut();
    const erroWrap = sut.getByTestId('error-wrap');
    expect(erroWrap.childElementCount).toBe(0);
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
  });
});

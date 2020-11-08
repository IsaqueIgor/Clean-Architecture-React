import faker from 'faker';

import * as FormHelper from '../utils/form-helpers';
import * as Helper from '../utils/helpers';
import * as Http from '../utils/http-mocks';

const validCredentials = {
  email: 'mango@gmail.com',
  password: '123456',
};

const path = /login/;

const mockInvalidCredentialsError = (): void => {
  Http.mockUnauthorizedError(path);
};

const mockUnexpectedError = (): void => {
  Http.mockServerError(path, 'POST');
};

const mockSuccess = (): void => {
  Http.mockOk(path, 'POST', 'fx:account');
};

const simulateValidSubmit = (): void => {
  cy.getByTestId('email').type(validCredentials.email);
  cy.getByTestId('password').type(validCredentials.password);
  cy.getByTestId('submit').click();
};

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login');
  });

  it('Should load ith correct initial state', () => {
    FormHelper.testInputStatus('email', 'Required Field');
    FormHelper.testInputStatus('password', 'Required Field');
    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').type(faker.random.word());
    FormHelper.testInputStatus('email', 'Invalid field');

    cy.getByTestId('password').type(faker.random.alphaNumeric(3));
    FormHelper.testInputStatus('password', 'Invalid field');

    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').type(faker.internet.email());
    FormHelper.testInputStatus('email');

    cy.getByTestId('password').type(faker.random.alphaNumeric(5));
    FormHelper.testInputStatus('password');

    cy.getByTestId('submit').should('not.have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present UnexpectedError on default error cases', () => {
    mockUnexpectedError();
    simulateValidSubmit();
    FormHelper.testMainError('Something went wrong. Try Again');
    Helper.testUrl('/login');
  });

  it('Should present invalidCredentialsError', () => {
    mockInvalidCredentialsError();
    simulateValidSubmit();
    FormHelper.testMainError('Invalid Credentials');
    Helper.testUrl('/login');
  });

  it('Should present save accessToken if valid credentials are provided', () => {
    mockSuccess();
    simulateValidSubmit();
    cy.getByTestId('error-wrap').should('not.have.descendants');
    Helper.testUrl('/');
    Helper.testLocalStorageItem('account');
  });

  it('Should prevent multiple submits', () => {
    mockSuccess();
    cy.getByTestId('email').type(validCredentials.email);
    cy.getByTestId('password').type(validCredentials.password);
    cy.getByTestId('submit').dblclick();
    Helper.testHttpCallsCount(1);
  });

  it('Should not call submit if form is invalid', () => {
    mockSuccess();
    cy.getByTestId('email').type(validCredentials.email).type('{enter}');
    Helper.testHttpCallsCount(0);
  });
});

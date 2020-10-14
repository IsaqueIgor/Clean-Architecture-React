import faker from 'faker';

import * as FormHelper from '../support/form-helper';
import * as Http from '../support/login-mocks';

const validCredentials = {
  email: 'mango@gmail.com',
  password: '123456',
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
    Http.mockUnexpectedError();
    simulateValidSubmit();
    FormHelper.testMainError('Something went wrong. Try Again');
    FormHelper.testUrl('/login');
  });

  it('Should present invalidCredentialsError', () => {
    Http.mockInvalidCredentialsError();
    simulateValidSubmit();
    FormHelper.testMainError('Invalid Credentials');
    FormHelper.testUrl('/login');
  });

  it('Should present save accessToken if valid credentials are provided', () => {
    Http.mockOk();
    simulateValidSubmit();
    cy.getByTestId('error-wrap').should('not.have.descendants');
    FormHelper.testUrl('/');
    FormHelper.testLocalStorageItem('accessToken');
  });

  it('Should present UnexpectedError if invalid data is returned', () => {
    Http.mockInvalidData();
    cy.getByTestId('email').type(validCredentials.email);
    cy.getByTestId('password').type(validCredentials.password).type('{enter}');
    FormHelper.testMainError('Something went wrong. Try Again');
    FormHelper.testUrl('/login');
  });

  it('Should prevent multiple submits', () => {
    Http.mockOk();
    cy.getByTestId('email').type(validCredentials.email);
    cy.getByTestId('password').type(validCredentials.password);
    cy.getByTestId('submit').dblclick();
    FormHelper.testHttpCallsCount(1);
  });

  it('Should not call submit if form is invalid', () => {
    Http.mockOk();
    cy.getByTestId('email').type(validCredentials.email).type('{enter}');
    FormHelper.testHttpCallsCount(0);
  });
});

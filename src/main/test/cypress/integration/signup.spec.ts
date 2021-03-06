import faker from 'faker';

import * as FormHelper from '../utils/form-helpers';
import * as Helper from '../utils/helpers';
import * as Http from '../utils/http-mocks';

const path = /signup/;

const mockEmailInUseError = (): void => {
  Http.mockForbiddenError(path, 'POST');
};

const mockUnexpectedError = (): void => {
  Http.mockServerError(path, 'POST');
};

const mockSuccess = (): void => {
  Http.mockOk(path, 'POST', 'fx:account');
};

const simulateValidSubmit = (): void => {
  cy.getByTestId('name').type(faker.name.findName());
  cy.getByTestId('email').type(faker.internet.email());
  const password = faker.random.alphaNumeric(7);
  cy.getByTestId('password').type(password);
  cy.getByTestId('passwordConfirmation').type(password);
  cy.getByTestId('submit').click();
};

describe('Sign Up', () => {
  beforeEach(() => {
    cy.visit('signup');
  });

  it('Should load ith correct initial state', () => {
    FormHelper.testInputStatus('name', 'Required Field');
    FormHelper.testInputStatus('email', 'Required Field');
    FormHelper.testInputStatus('password', 'Required Field');
    FormHelper.testInputStatus('passwordConfirmation', 'Required Field');
    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('name').type(faker.random.alphaNumeric(2));
    FormHelper.testInputStatus('name', 'Invalid field');

    cy.getByTestId('email').type(faker.random.word());
    FormHelper.testInputStatus('email', 'Invalid field');

    cy.getByTestId('password').type(faker.random.alphaNumeric(3));
    FormHelper.testInputStatus('password', 'Invalid field');

    cy.getByTestId('passwordConfirmation').type(faker.random.alphaNumeric(4));
    FormHelper.testInputStatus('passwordConfirmation', 'Invalid field');

    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('name').type(faker.name.findName());
    FormHelper.testInputStatus('name');

    cy.getByTestId('email').type(faker.internet.email());
    FormHelper.testInputStatus('email');

    const password = faker.random.alphaNumeric(5);
    cy.getByTestId('password').type(password);
    FormHelper.testInputStatus('password');
    cy.getByTestId('passwordConfirmation').type(password);
    FormHelper.testInputStatus('passwordConfirmation');

    cy.getByTestId('submit').should('not.have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present EmailInUse on 403', () => {
    mockEmailInUseError();
    simulateValidSubmit();
    FormHelper.testMainError('Email already in use');
    Helper.testUrl('/signup');
  });

  it('Should present UnexpectedError on default error cases', () => {
    mockUnexpectedError();
    simulateValidSubmit();
    FormHelper.testMainError('Something went wrong. Try Again');
    Helper.testUrl('/signup');
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
    cy.getByTestId('name').type(faker.name.findName());
    cy.getByTestId('email').type(faker.internet.email());
    const password = faker.random.alphaNumeric(7);
    cy.getByTestId('password').type(password);
    cy.getByTestId('passwordConfirmation').type(password);
    cy.getByTestId('submit').dblclick();
    Helper.testHttpCallsCount(1);
  });

  it('Should not call submit if form is invalid', () => {
    mockSuccess();
    cy.getByTestId('email').type(faker.internet.email()).type('{enter}');
    Helper.testHttpCallsCount(0);
  });
});

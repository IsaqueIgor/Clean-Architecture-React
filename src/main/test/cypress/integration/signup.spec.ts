import faker from 'faker';

import * as FormHelper from '../support/form-helper';

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
});

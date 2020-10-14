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
});

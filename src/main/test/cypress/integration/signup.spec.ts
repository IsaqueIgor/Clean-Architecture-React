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
});

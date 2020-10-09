import faker from 'faker';

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login');
  });

  it('Should load ith correct initial state', () => {
    cy.getByTestId('email-status').should(
      'have.attr',
      'title',
      'Required Field'
    );
    cy.getByTestId('password-status').should(
      'have.attr',
      'title',
      'Required Field'
    );
    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').type(faker.random.word());
    cy.getByTestId('email-status').should(
      'have.attr',
      'title',
      'Invalid field'
    );
    cy.getByTestId('password').type(faker.random.alphaNumeric(3));

    cy.getByTestId('password-status').should(
      'have.attr',
      'title',
      'Invalid field'
    );
    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });
});

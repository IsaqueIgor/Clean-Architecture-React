import faker from 'faker';

const { baseUrl } = Cypress.config();

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

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').type(faker.internet.email());
    cy.getByTestId('email-status').should('have.attr', 'title', 'Tudo certo!');
    cy.getByTestId('password').type(faker.random.alphaNumeric(5));

    cy.getByTestId('password-status').should(
      'have.attr',
      'title',
      'Tudo certo!'
    );
    cy.getByTestId('submit').should('not.have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present error if invalid credentials are provided', () => {
    cy.getByTestId('email').type(faker.internet.email());
    cy.getByTestId('password').type(faker.random.alphaNumeric(5));
    cy.getByTestId('submit').click();
    cy.getByTestId('error-wrap')
      .getByTestId('spinner')
      .should('exist')
      .getByTestId('main-error')
      .should('not.exist')
      .getByTestId('spinner')
      .should('not.exist')
      .getByTestId('main-error')
      .should('contain.text', 'Invalid Credentials');
    cy.url().should('eq', `${baseUrl}/login`);
  });
});

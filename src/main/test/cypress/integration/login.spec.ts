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
});

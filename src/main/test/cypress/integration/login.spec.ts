import faker from 'faker';

const { baseUrl } = Cypress.config();

const validCredentials = {
  email: 'mango@gmail.com',
  password: '123456',
};

describe('Login', () => {
  beforeEach(() => {
    cy.server();
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

  it('Should present UnexpectedError on 400', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 400,
      response: {
        error: faker.random.word(),
      },
    });
    cy.getByTestId('email').type(faker.internet.email());
    cy.getByTestId('password').type(faker.random.alphaNumeric(5));
    cy.getByTestId('submit').click();
    cy.getByTestId('spinner');
    cy.should('not.exist');
    cy.getByTestId('main-error');
    cy.should('contain.text', 'Something went wrong. Try Again');
    cy.url().should('eq', `${baseUrl}/login`);
  });

  it('Should present invalidCredentialsError', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 401,
      response: {
        error: faker.random.word(),
      },
    });
    cy.getByTestId('email').type(faker.internet.email());
    cy.getByTestId('password').type(faker.random.alphaNumeric(5));
    cy.getByTestId('submit').click();
    cy.getByTestId('spinner');
    cy.should('not.exist');
    cy.getByTestId('main-error');
    cy.should('contain.text', 'Invalid Credentials');
    cy.url().should('eq', `${baseUrl}/login`);
  });

  it('Should present save accessToken if valid credentials are provided', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 200,
      response: {
        accessToken: faker.random.uuid(),
      },
    });
    cy.getByTestId('email').type(validCredentials.email);
    cy.getByTestId('password').type(validCredentials.password);
    cy.getByTestId('submit').click();
    cy.getByTestId('main-error');
    cy.should('not.exist');
    cy.getByTestId('spinner');
    cy.should('not.exist');
    cy.url().should('eq', `${baseUrl}/`);
    cy.window().then((window) => assert.isOk(window.localStorage.getItem('accessToken')));
  });

  it('Should present UnexpectedError if invalid data is returned', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 200,
      response: {
        invalidProperty: faker.random.uuid(),
      },
    });
    cy.getByTestId('email').type(validCredentials.email);
    cy.getByTestId('password').type(validCredentials.password);
    cy.getByTestId('submit').click();
    cy.getByTestId('spinner').should('not.exist');
    cy.getByTestId('main-error').should(
      'contain.text',
      'Something went wrong. Try Again'
    );
    cy.url().should('eq', `${baseUrl}/login`);
  });

  it('Should prevent multiple submits', () => {
    cy.route({
      method: 'POST',
      url: /login/,
      status: 200,
      response: {
        invalidProperty: faker.random.uuid(),
      },
    }).as('request');
    cy.getByTestId('email').type(validCredentials.email);
    cy.getByTestId('password').type(validCredentials.password);
    cy.getByTestId('submit').dblclick();
    cy.get('@request.all').should('have.length', 1);
  });
});

import faker from 'faker';

import * as FormHelper from '../support/form-helpers';
import * as Helper from '../support/helpers';
import * as Http from '../support/survey-list-mocks';

const accountMock = {
  accessToken: faker.random.uuid(),
  name: faker.name.findName(),
};

describe('Login', () => {
  beforeEach(() => {
    Helper.setLocalStorageItem('account', accountMock);
  });

  it('Should present error on UnexpectedError', () => {
    Http.mockUnexpectedError();
    cy.visit('');
    cy.getByTestId('error').should('contain.text', 'Something went wrong. Try Again');
  });

  it('Should logout on AccessDeniedError', () => {
    Http.mockAccessDeniedError();
    cy.visit('');
    Helper.testUrl('/login');
  });

  it('Should present correct username', () => {
    Http.mockUnexpectedError();
    cy.visit('');
    const { name } = Helper.getLocalStorageItem('account');
    cy.getByTestId('username').should('contain.text', name);
  });
});

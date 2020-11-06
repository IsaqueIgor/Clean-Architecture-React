import faker from 'faker';

import * as FormHelper from '../support/form-helpers';
import * as Helper from '../support/helpers';
import * as Http from '../support/login-mocks';

const accountMock = {
  accessToken: faker.random.uuid(),
  name: faker.name.findName(),
};

describe('Login', () => {
  beforeEach(() => {
    Helper.setLocalStorageItem('account', accountMock);
  });

  it('Should load ith correct initial state', () => {
    Http.mockUnexpectedError();
    cy.visit('');
    cy.getByTestId('error').should('contain.text', 'Something went wrong. Try Again');
  });
});

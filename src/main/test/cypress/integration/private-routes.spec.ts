import faker from 'faker';

import * as FormHelper from '../support/form-helpers';
import * as Helper from '../support/helpers';
import * as Http from '../support/login-mocks';

describe('PrivateRoutes', () => {
  it('Should logout if survey-list has no token', () => {
    cy.visit('');
    Helper.testUrl('/login');
  });
});

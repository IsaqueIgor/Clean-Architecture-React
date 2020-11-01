import faker from 'faker';
import { Authentication } from '@/domain/userCases/autentication';

import { mockAccountModel } from './mock-account';

export const mockAuthentication = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAuthenticationModel = (): Authentication.Model => mockAccountModel();

export class AuthenticationSpy implements Authentication {
  account = mockAuthenticationModel();

  params: Authentication.Params;

  callsCount = 0;

  async auth(params: Authentication.Params): Promise<Authentication.Model> {
    this.params = params;
    this.callsCount += 1;
    return Promise.resolve(this.account);
  }
}

import faker from 'faker';

import { AddAccount } from '../userCases';
import { mockAccountModel } from './mock-account';

export const mockAddAccountParams = (): AddAccount.Params => {
  const password = faker.internet.password();
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password,
  };
};

export const mockAddAccountModel = (): AddAccount.Model => mockAccountModel();

export class AddAccountSpy implements AddAccount {
  account = mockAddAccountModel();

  params: AddAccount.Params;

  callsCount = 0;

  async add(params: AddAccount.Params): Promise<AddAccount.Model> {
    this.params = params;
    this.callsCount += 1;
    return this.account;
  }
}

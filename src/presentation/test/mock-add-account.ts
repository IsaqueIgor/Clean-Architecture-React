import { AddAccountParams, AddAccount } from '@/domain/userCases';
import { AccountModel } from '@/domain/models';
import { mockAccountModel } from '@/domain/test';

export class AddAccountSpy implements AddAccount {
  account = mockAccountModel();

  params: AddAccountParams;

  callsCount = 0;

  async add(params: AddAccountParams): Promise<AccountModel> {
    this.params = params;
    this.callsCount += 1;
    return this.account;
  }
}

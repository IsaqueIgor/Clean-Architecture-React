import faker from 'faker';
import { SetStorageMock } from '@/data/test';
import { UnexpectedError } from '@/domain/errors';
import { mockAccountModel } from '@/domain/test';
import { AccountModel } from '@/domain/models';

import { LocalUpdateCurrentAccount } from './local-update-current-account';

type SutTypes = {
  sut: LocalUpdateCurrentAccount;
  setStorageMock: SetStorageMock;
  account: AccountModel;
};

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock();
  const sut = new LocalUpdateCurrentAccount(setStorageMock);
  const account = mockAccountModel();
  return {
    sut,
    setStorageMock,
    account,
  };
};

describe('LocalUpdateCurrentAccount', () => {
  test('Should call SetStorage with correct value ', async () => {
    const { sut, setStorageMock, account } = makeSut();
    await sut.save(account);
    expect(setStorageMock.key).toBe('account');
    expect(setStorageMock.value).toBe(JSON.stringify(account));
  });

  test('Should throw if SetStorage throws ', async () => {
    const { sut, setStorageMock, account } = makeSut();
    jest.spyOn(setStorageMock, 'set').mockRejectedValueOnce(new Error());
    const promise = sut.save(account);
    await expect(promise).rejects.toThrow(new Error());
  });

  test('Should throw if accessToken is falsy', async () => {
    const { sut } = makeSut();
    const promise = sut.save(undefined);
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});

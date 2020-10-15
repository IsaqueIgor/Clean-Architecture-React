import faker from 'faker';
import { HttpPostClientSpy } from '@/data/test';
import { HttpStatusCode } from '@/data/protocols/http';
import { mockAddAccountParams, mockAccountModel } from '@/domain/test';
import { AccountModel } from '@/domain/models';
import { EmailInUseError, UnexpectedError } from '@/domain/errors';

import { RemoteAddAccount } from './remote-add-account';

type SutTypes = {
  sut: RemoteAddAccount;
  httpPostClientSpy: HttpPostClientSpy<AccountModel>;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AccountModel>();
  const sut = new RemoteAddAccount(url, httpPostClientSpy);
  return {
    sut,
    httpPostClientSpy,
  };
};

describe('RemoteAddAccount', () => {
  test('should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.add(mockAddAccountParams());
    expect(httpPostClientSpy.url).toBe(url);
  });

  test('should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const addAccountParams = mockAddAccountParams();
    await sut.add(addAccountParams);
    expect(httpPostClientSpy.body).toEqual(addAccountParams);
  });

  test('should throw EmailInUseError if HttpPostClient returns 403', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };
    const promise = sut.add(mockAddAccountParams());
    expect(promise).rejects.toThrow(new EmailInUseError());
  });

  test('should throw EmailInUseError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promise = sut.add(mockAddAccountParams());
    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should throw EmailInUseError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.add(mockAddAccountParams());
    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should throw EmailInUseError if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.add(mockAddAccountParams());
    expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('should return an AccountModel if HttpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const httpResult = mockAccountModel();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult,
    };
    const promise = await sut.add(mockAddAccountParams());
    expect(promise).toEqual(httpResult);
  });
});

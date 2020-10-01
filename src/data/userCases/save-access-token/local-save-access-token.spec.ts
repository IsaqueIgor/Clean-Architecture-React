import faker from 'faker';
import { SetStorageMock } from '@/data/test';

import { LocalSaveAccessToken } from './local-save-access-token';

type SutTypes = {
  sut: LocalSaveAccessToken;
  setStorageMock: SetStorageMock;
};

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock();
  const sut = new LocalSaveAccessToken(setStorageMock);
  return {
    sut,
    setStorageMock,
  };
};

describe('LocalSaveAccessToken', () => {
  test('Should call SetStorage with correct value ', async () => {
    const { sut, setStorageMock } = makeSut();
    const acessToken = faker.random.uuid();
    await sut.save(acessToken);
    expect(setStorageMock.key).toBe('acessToken');
    expect(setStorageMock.value).toBe(acessToken);
  });

  test('Should throw if SetStorage throws ', async () => {
    const { sut, setStorageMock } = makeSut();
    jest.spyOn(setStorageMock, 'set').mockRejectedValueOnce(new Error());
    const acessToken = faker.random.uuid();
    const promise = sut.save(acessToken);
    await expect(promise).rejects.toThrow(new Error());
  });
});

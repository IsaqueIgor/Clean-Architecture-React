import faker from 'faker';

import 'jest-localstorage-mock';

import { LocalStorageAdapter } from './local-storage-adapter';

const makeSut = (): LocalStorageAdapter => new LocalStorageAdapter();

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('Should call LocalStorage.setItem with correct values', async () => {
    const sut = makeSut();
    const key = faker.database.column();
    const value = faker.random.objectElement<{}>();
    sut.set(key, value);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      key,
      JSON.stringify(value)
    );
  });

  test('Should call LocalStorage.getItem with correct value', async () => {
    const sut = makeSut();
    const key = faker.database.column();
    const value = faker.random.objectElement<{}>();
    const getItemSpy = jest
      .spyOn(localStorage, 'getItem')
      .mockReturnValueOnce(JSON.stringify(value));
    const obj = sut.get(key);
    expect(obj).toEqual(value);
    expect(getItemSpy).toHaveBeenCalledWith(key);
  });
});

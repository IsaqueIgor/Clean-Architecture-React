import faker from 'faker';
import { SetStorageSpy } from '@/data/test/mock-storage';

import { LocalSaveAccessToken } from './local-save-access-token';

describe('LocalSaveAccessToken', () => {
  test('Should call SetStorage with correct value ', async () => {
    const setStorageSpy = new SetStorageSpy();
    const sut = new LocalSaveAccessToken(setStorageSpy);
    const acessToken = faker.random.uuid();
    await sut.save(acessToken);
    expect(setStorageSpy.key).toBe('acessToken');
    expect(setStorageSpy.value).toBe(acessToken);
  });
});

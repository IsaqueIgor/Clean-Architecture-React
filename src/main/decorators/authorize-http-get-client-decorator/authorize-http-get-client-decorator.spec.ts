import { mockGetRequest, GetStorageSpy } from '@/data/test';
import { AuthorizeHttpGetClientDecorator } from '@/main/decorators';

describe('AuthorizeHttpGetClientDecorator', () => {
  test('should call GetStorage with correct value', () => {
    const getStoregeSpy = new GetStorageSpy();
    const sut = new AuthorizeHttpGetClientDecorator(getStoregeSpy);
    sut.get(mockGetRequest());
    expect(getStoregeSpy.key).toBe('account');
  });
});

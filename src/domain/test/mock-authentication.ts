import faker from 'faker';
import { AuthenticationParams } from '@/domain/userCases/autentication';

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

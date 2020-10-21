import faker from 'faker';
import { AuthenticationParams } from '@/domain/userCases/autentication';

import { AccountModel } from '../models';

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockAccountModel = (): AccountModel => ({
  name: faker.name.findName(),
  accessToken: faker.random.uuid(),
});

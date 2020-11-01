import faker from 'faker';
import { Authentication } from '@/domain/userCases/autentication';

export const mockAccountModel = (): Authentication.Model => ({
  name: faker.name.findName(),
  accessToken: faker.random.uuid(),
});

/* eslint-disable implicit-arrow-linebreak */
import { UpdateCurrentAccount } from '@/domain/userCases';
import { LocalUpdateCurrentAccount } from '@/data/userCases/update-current-account/local-update-current-account';
import { makeLocalStorageAdapter } from '@/main/factories/cache/local-storage-adapter-factory';

export const makeLocalUpdateCurrentAccount = (): UpdateCurrentAccount =>
  new LocalUpdateCurrentAccount(makeLocalStorageAdapter());

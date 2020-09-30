/* eslint-disable implicit-arrow-linebreak */
import { SaveAcessToken } from '@/domain/userCases';
import { LocalSaveAccessToken } from '@/data/userCases/save-access-token/local-save-access-token';
import { makeLocalStorageAdapter } from '@/main/factories/cache/local-storage-adapter-factory';

export const makeLocalSaveAccessToken = (): SaveAcessToken =>
  new LocalSaveAccessToken(makeLocalStorageAdapter());

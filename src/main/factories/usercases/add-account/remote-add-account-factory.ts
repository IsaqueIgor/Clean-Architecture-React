/* eslint-disable implicit-arrow-linebreak */
import { AddAccount } from '@/domain/userCases';
import { makeApiUrl } from '@/main/factories/http/api-url-factory';
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory';
import { RemoteAddAccount } from '@/data/userCases/add-account/remote-add-account';

export const makeRemoteAddAccount = (): AddAccount =>
  new RemoteAddAccount(makeApiUrl('/signup'), makeAxiosHttpClient());

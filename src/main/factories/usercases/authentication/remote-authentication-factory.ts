import { RemoteAuthentication } from '@/data/userCases/authentication/remote-authentication';
import { Authentication } from '@/domain/userCases';
import { makeApiUrl } from '@/main/factories/http/api-url-factory';
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory';

export const makeRemoteAuthentication = (): Authentication => {
  return new RemoteAuthentication(makeApiUrl(), makeAxiosHttpClient());
};

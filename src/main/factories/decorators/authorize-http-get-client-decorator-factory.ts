/* eslint-disable max-len */
import { AuthorizeHttpGetClientDecorator } from '@/main/decorators';
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory';
import { makeLocalStorageAdapter } from '@/main/factories/cache/local-storage-adapter-factory';
import { HttpGetClient } from '@/data/protocols/http';

export const makeAuthorizeHttpClientDecorator = () : HttpGetClient => new AuthorizeHttpGetClientDecorator(makeLocalStorageAdapter(), makeAxiosHttpClient());

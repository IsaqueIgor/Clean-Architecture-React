/* eslint-disable max-classes-per-file */
import faker from 'faker';
import {
  HttpPostClient,
  HttpPostParams,
  HttpGetParams,
  HttpGetClient,
  HttpStatusCode,
  HttpResponse,
} from '@/data/protocols/http/';

export const mockPostRequest = (): HttpPostParams => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
});

export const mockGetRequest = (): HttpGetParams => ({
  url: faker.internet.url(),
  headers: faker.random.objectElement(),
});

export class HttpPostClientSpy<R> implements HttpPostClient<R> {
  url?: string;

  body?: any;

  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok,
  };

  async post(params: HttpPostParams): Promise<HttpResponse<R>> {
    this.url = params.url;
    this.body = params.body;
    return Promise.resolve(this.response);
  }
}

export class HttpGetClientSpy<R> implements HttpGetClient<R> {
  url: string;

  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok,
  };

  async get(params: HttpGetParams): Promise<HttpResponse<R>> {
    this.url = params.url;
    return Promise.resolve(this.response);
  }
}

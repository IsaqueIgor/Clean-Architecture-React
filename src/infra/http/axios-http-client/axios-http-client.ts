/* eslint-disable class-methods-use-this */
import axios, { AxiosResponse } from 'axios';
import {
  HttpPostParams,
  HttpResponse,
  HttpPostClient,
} from '@/data/protocols/http';

export class AxiosHttpClient implements HttpPostClient {
  async post(params: HttpPostParams): Promise<HttpResponse> {
    let httpResponse: AxiosResponse;
    try {
      httpResponse = await axios.post(params.url, params.body);
      return {
        statusCode: httpResponse.status,
        body: httpResponse.data,
      };
    } catch (error) {
      httpResponse = error.response;
    }
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data,
    };
  }
}

/* eslint-disable class-methods-use-this */
import axios, { AxiosResponse } from 'axios';
import {
  HttpPostParams,
  HttpResponse,
  HttpPostClient,
} from '@/data/protocols/http';

export class AxiosHttpClient implements HttpPostClient {
  async post(params: HttpPostParams): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;
    try {
      axiosResponse = await axios.post(params.url, params.body);
    } catch (error) {
      axiosResponse = error.response;
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  }
}

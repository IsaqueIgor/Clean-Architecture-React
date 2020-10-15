import { HttpResponse } from '.';

export type HttGetParams = {
  url: string;
};

export interface HttpGetClient<R = any> {
  get(params: HttGetParams): Promise<void>;
}

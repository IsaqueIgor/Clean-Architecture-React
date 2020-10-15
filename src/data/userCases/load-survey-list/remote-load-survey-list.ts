import { SurveyModel } from '@/domain/models';
import { LoadSurveyList } from '@/domain/userCases/load-survey-list';
import { HttpGetClient } from '@/data/protocols/http/http-get-client';
import { HttpStatusCode } from '@/data/protocols/http';
import { UnexpectedError } from '@/domain/errors';

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<SurveyModel[]>
  ) {}

  async loadAll(): Promise<void> {
    const httpResponse = await this.httpGetClient.get({
      url: this.url,
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        break;
      default:
        throw new UnexpectedError();
    }
  }
}

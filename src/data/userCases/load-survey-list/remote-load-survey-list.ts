import { SurveyModel } from '@/domain/models';
import { LoadSurveyList } from '@/domain/userCases/load-survey-list';
import { HttpGetClient } from '@/data/protocols/http/http-get-client';

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<void>
  ) {}

  async loadAll(): Promise<void> {
    await this.httpGetClient.get({
      url: this.url,
    });
  }
}

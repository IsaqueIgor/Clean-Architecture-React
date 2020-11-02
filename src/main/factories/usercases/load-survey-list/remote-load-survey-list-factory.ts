import { LoadSurveyList } from '@/domain/userCases';
import { makeApiUrl } from '@/main/factories/http/api-url-factory';
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators';
import { RemoteLoadSurveyList } from '@/data/userCases/load-survey-list/remote-load-survey-list';

export const makeRemoteLoadSurveyList = (): LoadSurveyList => new RemoteLoadSurveyList(makeApiUrl('/surveys'), makeAuthorizeHttpClientDecorator());

import React from 'react';

import { SurveyList } from '@/presentation/pages';
import { makeRemoteLoadSurveyList } from '@/main/factories/usercases/load-survey-list/remote-load-survey-list-factory';

export const makeSurveyList: React.FC = () => (
  <SurveyList
    loadSurveyList={makeRemoteLoadSurveyList()}
  />
);

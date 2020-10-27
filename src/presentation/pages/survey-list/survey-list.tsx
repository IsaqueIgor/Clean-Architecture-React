import React, { useEffect, useState } from 'react';

import { Footer, Header } from '@/presentation/components';
import {
  SurveyItemEmpty,
  SurveyItem,
} from '@/presentation/pages/survey-list/components';
import { LoadSurveyList } from '@/domain/userCases';
import { SurveyModel } from '@/domain/models';

import Styles from './survey-list-styles.scss';

type Props = {
  loadSurveyList: LoadSurveyList;
};

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[],
  });

  useEffect(() => {
    loadSurveyList.loadAll().then((surveys) => setState({ surveys }));
  }, []);

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <main className={Styles.contentWrap}>
        <h2>Surveys</h2>
        <span>Below are the public polls</span>
        <ul data-testid="survey-list">
          {state.surveys.length ? (
            state.surveys.map((survey: SurveyModel) => (
              <SurveyItem key={survey.id} survey={survey} />
            ))
          ) : (
            <SurveyItemEmpty />
          )}
        </ul>
      </main>
      <Footer />
    </div>
  );
};

export default SurveyList;

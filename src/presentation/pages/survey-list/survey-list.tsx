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
    error: '',
  });

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) => setState({ ...state, surveys }))
      .catch((error) => setState({ ...state, error: error.message }));
  }, []);

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <main className={Styles.contentWrap}>
        <h2>Surveys</h2>
        <span>Below are the public polls</span>
        {state.error ? (
          <div>
            <span data-testid="error">{state.error}</span>
            <button type="button">Reload</button>
          </div>
        ) : (
          <ul data-testid="survey-list">
            {state.surveys.length ? (
              state.surveys.map((survey: SurveyModel) => (
                <SurveyItem key={survey.id} survey={survey} />
              ))
            ) : (
              <SurveyItemEmpty />
            )}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SurveyList;

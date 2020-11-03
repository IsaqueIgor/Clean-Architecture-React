import React, { useContext, useEffect, useState } from 'react';

import { Footer, Header } from '@/presentation/components';
import {
  ErrorContent,
  SurveyContext,
  SurveyListItem,
} from '@/presentation/pages/survey-list/components';
import { LoadSurveyList } from '@/domain/userCases';
import { AccessDeniedError } from '@/domain/errors';
import { useHistory } from 'react-router-dom';
import { ApiContext } from '@/presentation/contexts';

import Styles from './survey-list-styles.scss';

type Props = {
  loadSurveyList: LoadSurveyList;
};

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const history = useHistory();
  const { setCurrentAccount } = useContext(ApiContext);
  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false,
  });

  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) => setState({ ...state, surveys }))
      .catch((error) => {
        if (error instanceof AccessDeniedError) {
          setCurrentAccount(undefined);
          history.replace('/login');
        } else {
          setState({ ...state, error: error.message });
        }
      });
  }, [state.reload]);

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <main className={Styles.contentWrap}>
        <h2>Surveys</h2>
        <span>Below are the public polls</span>
        <SurveyContext.Provider value={{ state, setState }}>
          {state.error ? <ErrorContent /> : <SurveyListItem />}
        </SurveyContext.Provider>
      </main>
      <Footer />
    </div>
  );
};

export default SurveyList;

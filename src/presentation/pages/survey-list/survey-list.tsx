import React from 'react';

import { Footer, Header } from '@/presentation/components';
import { SurveyItemEmpty } from '@/presentation/pages/survey-list/components';

import Styles from './survey-list-styles.scss';

const SurveyList: React.FC = () => (
  <div className={Styles.surveyListWrap}>
    <Header />
    <main className={Styles.contentWrap}>
      <h2>Surveys</h2>
      <span>Below are the public polls</span>
      <ul data-testid="survey-list">
        <SurveyItemEmpty />
      </ul>
    </main>
    <Footer />
  </div>
);

export default SurveyList;

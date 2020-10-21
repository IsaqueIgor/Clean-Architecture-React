import React from 'react';

import {
  Footer,
  Header,
  Icon,
  IconName
} from '@/presentation/components';

import Styles from './survey-list-styles.scss';

const SurveyList: React.FC = () => (
  <div className={Styles.surveyListWrap}>
    <Header />
    <main className={Styles.contentWrap}>
      <h2>Surveys</h2>
      <span>Below are the public polls</span>
      <ul>
        <li>
          <div className={Styles.surveyContent}>
            <Icon iconName={IconName.thumbUp} />
            <time>
              <span className={Styles.day}>22</span>
              <span className={Styles.month}>03</span>
              <span className={Styles.year}>2020</span>
            </time>
            <p>Qual é seu framework web favotiro?</p>
          </div>
          <footer>See Results</footer>
        </li>
      </ul>
    </main>
    <Footer />
  </div>
);

export default SurveyList;

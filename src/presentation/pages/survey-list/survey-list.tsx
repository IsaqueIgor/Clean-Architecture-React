import React from 'react';

import { Footer } from '@/presentation/components';

import Styles from './survey-list-styles.scss';

const SurveyList: React.FC = () => (
  <div className={Styles.surveyListWrap}>
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <div className={Styles.logoWrap}>
          <h1>ASKIT</h1>
        </div>
        <div className={Styles.logoutWrap}>
          <span>Isaque</span>
          <a href="/#">Logout</a>
        </div>
      </div>
    </header>
    <main className={Styles.contentWrap}>
      <h2>Surveys</h2>
      <span>Below are the public polls</span>
      <ul>
        <li>
          <div className={Styles.surveyContent}>
            <time>
              <span className={Styles.day}>22</span>
              <span className={Styles.month}>03</span>
              <span className={Styles.year}>2020</span>
            </time>
            <p>Qual é seu framework web favotiro?</p>
          </div>
          <footer>See Results</footer>
        </li>
        <li>
          <div className={Styles.surveyContent}>
            <time>
              <span className={Styles.day}>22</span>
              <span className={Styles.month}>03</span>
              <span className={Styles.year}>2020</span>
            </time>
            <p>Qual é seu framework web favotiro?</p>
          </div>
          <footer>See Results</footer>
        </li>
        <li>
          <div className={Styles.surveyContent}>
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

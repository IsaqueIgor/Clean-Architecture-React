import React from 'react';

import Styles from './survey-item-empty-styles.scss';

const SurveyItemEmpty: React.FC = () => (
  <>
    <li className={Styles.surveyItemEmpty} />
    <li className={Styles.surveyItemEmpty} />
    <li className={Styles.surveyItemEmpty} />
    <li className={Styles.surveyItemEmpty} />
  </>
);

export default SurveyItemEmpty;

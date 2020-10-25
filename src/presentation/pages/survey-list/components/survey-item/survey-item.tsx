import React from 'react';

import { IconName, Icon } from '@/presentation/components';

import Styles from './survey-item-styles.scss';

const SurveyItem: React.FC = () => (
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
);

export default SurveyItem;

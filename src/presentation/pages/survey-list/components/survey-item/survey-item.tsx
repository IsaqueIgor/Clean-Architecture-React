import React from 'react';

import { IconName, Icon } from '@/presentation/components';
import { SurveyModel } from '@/domain/models';

import Styles from './survey-item-styles.scss';

type Props = {
  survey: SurveyModel;
};

const SurveyItem: React.FC<Props> = ({ survey }: Props) => (
  <li>
    <div className={Styles.surveyContent}>
      <Icon iconName={IconName.thumbUp} />
      <time>
        <span data-testid="day" className={Styles.day}>
          {survey.date.getDate()}
        </span>
        <span data-testid="month" className={Styles.month}>
          {survey.date
            .toLocaleString('pt-BR', { month: 'short' })
            .replace('.', '')}
        </span>
        <span data-testid="year" className={Styles.year}>
          {survey.date.getFullYear()}
        </span>
      </time>
      <p data-testid="question">{survey.question}</p>
    </div>
    <footer>See Results</footer>
  </li>
);

export default SurveyItem;

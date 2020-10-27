import React from 'react';

import { SurveyItem } from '@/presentation/pages/survey-list/components';
import { render, screen } from '@testing-library/react';
import { mockSurveyModel } from '@/domain/test';
import { SurveyModel } from '@/domain/models';
import { IconName } from '@/presentation/components';
import { Console } from 'console';

const makeSut = (survey: SurveyModel): void => {
  render(<SurveyItem survey={survey} />);
};

describe('SurveyItem Component', () => {
  test('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: true,
      date: new Date('2020-11-10T00:00:00'),
    });
    makeSut(survey);
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp);
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question);
    expect(screen.getByTestId('day')).toHaveTextContent('10');
    expect(screen.getByTestId('month')).toHaveTextContent('nov');
    expect(screen.getByTestId('year')).toHaveTextContent('2020');
  });

  test('Should render with correct values', () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: false,
      date: new Date('2019-05-01T00:00:00'),
    });
    makeSut(survey);
    expect(screen.getByTestId('icon')).toHaveProperty(
      'src',
      IconName.thumbDown
    );
    expect(screen.getByTestId('question')).toHaveTextContent(survey.question);
    expect(screen.getByTestId('day')).toHaveTextContent('01');
    expect(screen.getByTestId('month')).toHaveTextContent('mai');
    expect(screen.getByTestId('year')).toHaveTextContent('2019');
  });
});

import React, { useContext } from 'react';

import { SurveyContext } from '@/presentation/pages/survey-list/components';

import Styles from './error-styles.scss';

const Error: React.FC = () => {
  const { state, setState } = useContext(SurveyContext);

  const handleReload = (): void => {
    setState({ surveys: [], error: '', reload: !state.reload });
  };

  return (
    <div className={Styles.errorWrap}>
      <h1>Whoops!</h1>
      <span data-testid="error">{state.error}</span>
      <button data-testid="reload" type="button" onClick={handleReload}>
        Try Again
      </button>
    </div>
  );
};
export default Error;

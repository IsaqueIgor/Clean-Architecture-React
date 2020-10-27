import React, { useContext } from 'react';

import { SurveyContext } from '@/presentation/pages/survey-list/components';

const Error: React.FC = () => {
  const { state } = useContext(SurveyContext);

  return (
    <div>
      <span data-testid="error">{state.error}</span>
      <button type="button">Reload</button>
    </div>
  );
};
export default Error;

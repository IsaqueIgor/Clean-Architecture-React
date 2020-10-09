import React, { useContext, memo } from 'react';

import Context from '@/presentation/contexts/form/form-context';

import Styles from './form-status-styles.scss';

import { Spinner } from '..';

const FormStatus: React.FC = () => {
  const { state } = useContext(Context);
  const { isLoading, mainError } = state;
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {mainError && (
        <span data-testid="main-error" className={Styles.error}>
          {mainError}
        </span>
      )}
    </div>
  );
};

export default memo(FormStatus);

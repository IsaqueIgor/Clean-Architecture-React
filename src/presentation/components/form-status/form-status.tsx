import React, { useContext } from 'react';
import Styles from './form-status-styles.scss';
import Context from '@/presentation/contexts/form/form-context';
import { Spinner } from '..';

const FormStatus: React.FC = () => {
  const { isLoading, errorMessage } = useContext(Context);
  return (
    <div data-testid='error-wrap' className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {errorMessage && <span className={Styles.error}>{errorMessage}</span>}
    </div>
  );
};

export default FormStatus;

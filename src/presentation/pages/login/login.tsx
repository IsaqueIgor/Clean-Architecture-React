import React, { useState } from 'react';
import Styles from './login-styles.scss';
import {
  LoginHeader,
  Footer,
  Input,
  FormStatus,
} from '@/presentation/components';

import Context from '@/presentation/contexts/form/form-context';

const Login: React.FC = () => {
  const [state] = useState({
    isLoading: false,
    errorMessage: '',
    emailError: 'Required Field',
    passwordError: 'Required Field',
  });

  return (
    <div className={Styles.loginWrap}>
      <LoginHeader />
      <Context.Provider value={state}>
        <form data-testid='form' className={Styles.form}>
          <h2>Login</h2>
          <Input required type='email' name='email' placeholder='E-mail' />
          <Input
            required
            type='password'
            name='password'
            placeholder='Password'
          />

          <button
            data-testid='submit'
            disabled
            className={Styles.submit}
            type='submit'
          >
            Enter
          </button>
          <span className={Styles.link}>Create Account</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default Login;

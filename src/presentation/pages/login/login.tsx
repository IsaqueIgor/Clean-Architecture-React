import React, { useState, useEffect } from 'react';

import Styles from './login-styles.scss';

import {
  LoginHeader,
  Footer,
  Input,
  FormStatus,
} from '@/presentation/components';
import Context from '@/presentation/contexts/form/form-context';
import { Validation } from '@/presentation/protocols/validation';
import { Authentication } from '@/domain/userCases';

type Props = {
  validation: Validation;
  authentication: Authentication;
};

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: '',
  });

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
    });
  }, [state.email, state.password]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      if (state.isLoading || state.emailError || state.passwordError) {
        return;
      }
      setState({ ...state, isLoading: true });
      await authentication.auth({
        email: state.email,
        password: state.password,
      });
    } catch (err) {
      setState({ ...state, isLoading: false, mainError: err.message });
    }
  };

  return (
    <div className={Styles.loginWrap}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form
          data-testid='form'
          onSubmit={handleSubmit}
          className={Styles.form}
        >
          <h2>Login</h2>
          <Input type='email' name='email' placeholder='Email' />
          <Input type='password' name='password' placeholder='Password' />

          <button
            data-testid='submit'
            disabled={!!state.emailError || !!state.passwordError}
            className={Styles.submit}
            type='submit'
          >
            Sign in
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

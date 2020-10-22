import React, { useState, useEffect, useContext } from 'react';

import { Link, useHistory } from 'react-router-dom';
import { Input, FormStatus, SubmitButton } from '@/presentation/components';
import { ApiContext, FormContext } from '@/presentation/contexts';
import { Validation } from '@/presentation/protocols/validation';
import { Authentication } from '@/domain/userCases';

import Styles from './login-styles.scss';

type Props = {
  validation: Validation;
  authentication: Authentication;
};

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext);
  const history = useHistory();
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    mainError: '',
  });

  useEffect(() => {
    const { email, password } = state;
    const formData = { email, password };
    const emailError = validation.validate('email', formData);
    const passwordError = validation.validate('password', formData);

    setState({
      ...state,
      emailError,
      passwordError,
      isFormInvalid: !!emailError || !!passwordError,
    });
  }, [state.email, state.password]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      if (state.isLoading || state.isFormInvalid) {
        return;
      }
      setState({ ...state, isLoading: true });
      const account = await authentication.auth({
        email: state.email,
        password: state.password,
      });
      setCurrentAccount(account);
      history.replace('/');
    } catch (err) {
      setState({ ...state, isLoading: false, mainError: err.message });
    }
  };

  return (
    <div className={Styles.loginWrap}>
      <div className={Styles.branding} />
      <FormContext.Provider value={{ state, setState }}>
        <form
          data-testid="form"
          onSubmit={handleSubmit}
          className={Styles.form}
        >
          <h2>Account Login</h2>
          <Input type="email" name="email" placeholder="Email" />
          <Input type="password" name="password" placeholder="Password" />

          <SubmitButton text="Enter" />
          <Link data-testid="signup-link" to="/signup" className={Styles.link}>
            Create Account
          </Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
    </div>
  );
};

export default Login;

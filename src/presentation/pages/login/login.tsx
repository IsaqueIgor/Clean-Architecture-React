import React, { useState, useEffect } from 'react';

import { Link, useHistory } from 'react-router-dom';
import {
  LoginHeader,
  Footer,
  Input,
  FormStatus,
  SubmitButton,
} from '@/presentation/components';
import Context from '@/presentation/contexts/form/form-context';
import { Validation } from '@/presentation/protocols/validation';
import { Authentication, SaveAcessToken } from '@/domain/userCases';

import Styles from './login-styles.scss';

type Props = {
  validation: Validation;
  authentication: Authentication;
  saveAccessToken: SaveAcessToken;
};

const Login: React.FC<Props> = ({
  validation,
  authentication,
  saveAccessToken,
}: Props) => {
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
    const emailError = validation.validate('email', state.email);
    const passwordError = validation.validate('password', state.password);

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
      await saveAccessToken.save(account.accessToken);
      history.replace('/');
    } catch (err) {
      setState({ ...state, isLoading: false, mainError: err.message });
    }
  };

  return (
    <div className={Styles.loginWrap}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form
          data-testid="form"
          onSubmit={handleSubmit}
          className={Styles.form}
        >
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Email" />
          <Input type="password" name="password" placeholder="Password" />

          <SubmitButton text="Enter" />
          <Link data-testid="signup-link" to="/signup" className={Styles.link}>
            Create Account
          </Link>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default Login;

import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import {
  LoginHeader,
  Footer,
  Input,
  FormStatus,
} from '@/presentation/components';
import Context from '@/presentation/contexts/form/form-context';
import { Validation } from '@/presentation/protocols/validation';

import Styles from './signup-styles.scss';

type Props = {
  validation: Validation;
};

const SignUp: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: '',
    passwordError: '',
    emailError: '',
    passwordConfirmationError: '',
    mainError: '',
  });

  useEffect(() => {
    setState({
      ...state,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
      passwordConfirmationError: validation.validate(
        'passwordConfirmation',
        state.passwordConfirmation
      ),
    });
  }, [state.name, state.email, state.password, state.passwordConfirmation]);

  return (
    <div className={Styles.signup}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form className={Styles.form}>
          <h2>Register</h2>
          <Input type="text" name="name" placeholder="Your Name" />
          <Input type="email" name="email" placeholder="Email" />
          <Input type="password" name="password" placeholder="Password" />
          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="Confirm your Password"
          />

          <button
            data-testid="submit"
            disabled
            className={Styles.submit}
            type="submit"
          >
            Sign up
          </button>
          <span className={Styles.link}>Back to Login</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default SignUp;

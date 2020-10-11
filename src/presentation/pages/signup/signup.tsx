import React, { useState, useEffect } from 'react';

import { Link, useHistory } from 'react-router-dom';
import { Input, FormStatus, SubmitButton } from '@/presentation/components';
import Context from '@/presentation/contexts/form/form-context';
import { Validation } from '@/presentation/protocols/validation';
import { AddAccount, SaveAcessToken } from '@/domain/userCases';

import Styles from './signup-styles.scss';

type Props = {
  validation: Validation;
  addAccount: AddAccount;
  saveAccessToken: SaveAcessToken;
};

const SignUp: React.FC<Props> = ({
  validation,
  addAccount,
  saveAccessToken,
}: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
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

  const history = useHistory();

  useEffect(() => {
    const {
      name,
      email,
      password,
      passwordConfirmation
    } = state;

    const formData = {
      name,
      email,
      password,
      passwordConfirmation,
    };

    const nameError = validation.validate('name', formData);
    const emailError = validation.validate('email', formData);
    const passwordError = validation.validate('password', formData);
    const passwordConfirmationError = validation.validate(
      'passwordConfirmation',
      formData
    );

    setState({
      ...state,
      nameError,
      emailError,
      passwordError,
      passwordConfirmationError,
      isFormInvalid:
        !!nameError ||
        !!emailError ||
        !!passwordError ||
        !!passwordConfirmationError,
    });
  }, [state.name, state.email, state.password, state.passwordConfirmation]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      if (state.isLoading || state.isFormInvalid) {
        return;
      }
      setState({ ...state, isLoading: true });
      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation,
      });
      await saveAccessToken.save(account.accessToken);
      history.replace('/');
    } catch (error) {
      setState({ ...state, isLoading: false, mainError: error.message });
    }
  };

  return (
    <div className={Styles.signup}>
      <Context.Provider value={{ state, setState }}>
        <form
          className={Styles.form}
          data-testid="form"
          onSubmit={handleSubmit}
        >
          <h2>Register</h2>
          <Input type="text" name="name" placeholder="Your Name" />
          <Input type="email" name="email" placeholder="Email" />
          <Input type="password" name="password" placeholder="Password" />
          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="Confirm your Password"
          />

          <SubmitButton text="Register" />
          <Link
            data-testid="login-link"
            replace
            to="/login"
            className={Styles.link}
          >
            Back to Login
          </Link>
          <FormStatus />
        </form>
      </Context.Provider>
    </div>
  );
};

export default SignUp;

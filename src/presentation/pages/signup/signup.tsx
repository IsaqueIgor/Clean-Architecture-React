import React, { useState, useEffect, useContext } from 'react';

import { Link, useHistory } from 'react-router-dom';
import { Input, FormStatus, SubmitButton } from '@/presentation/components';
import { ApiContext, FormContext } from '@/presentation/contexts';
import { Validation } from '@/presentation/protocols/validation';
import { AddAccount } from '@/domain/userCases';

import Styles from './signup-styles.scss';

type Props = {
  validation: Validation;
  addAccount: AddAccount;
};

const SignUp: React.FC<Props> = ({ validation, addAccount }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext);
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

  useEffect(() => { validate('name'); }, [state.name]);
  useEffect(() => { validate('email'); }, [state.email]);
  useEffect(() => { validate('password'); }, [state.password]);
  useEffect(() => { validate('passwordConfirmation'); }, [state.passwordConfirmation]);

  const validate = (field: string): void => {
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
    setState((old) => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }));
    setState((old) => ({
      ...old,
      isFormInvalid:
        !!old.nameError ||
        !!old.emailError ||
        !!old.passwordError ||
        !!old.passwordConfirmationError
    }));
  };

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
      setCurrentAccount(account);
      history.replace('/');
    } catch (error) {
      setState({ ...state, isLoading: false, mainError: error.message });
    }
  };

  return (
    <div className={Styles.signup}>
      <FormContext.Provider value={{ state, setState }}>
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
      </FormContext.Provider>
    </div>
  );
};

export default SignUp;

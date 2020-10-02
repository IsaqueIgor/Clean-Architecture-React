import React from 'react';

import { Link } from 'react-router-dom';
import {
  LoginHeader,
  Footer,
  Input,
  FormStatus,
} from '@/presentation/components';
import Context from '@/presentation/contexts/form/form-context';

import Styles from './signup-styles.scss';

const SignUp: React.FC = () => (
  <div className={Styles.signup}>
    <LoginHeader />
    <Context.Provider value={{ state: {} }}>
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

        <button className={Styles.submit} type="submit">
          Sign up
        </button>
        <Link to="/login" className={Styles.link}>
          Back to Login
        </Link>
        <FormStatus />
      </form>
    </Context.Provider>
    <Footer />
  </div>
);

export default SignUp;

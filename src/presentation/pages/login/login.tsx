import React from 'react';
import Styles from './login-styles.scss';
import {
  LoginHeader,
  Footer,
  Input,
  FormStatus,
} from '@/presentation/components';

const Login: React.FC = () => (
  <div className={Styles.loginWrap}>
    <LoginHeader />
    <form data-testid='form' className={Styles.form}>
      <h2>Login</h2>
      <Input type='email' name='email' placeholder='E-mail' />
      <Input type='password' name='password' placeholder='Password' />

      <button className={Styles.submit} type='submit'>
        Enter
      </button>
      <span className={Styles.link}>Create Account</span>
      <FormStatus />
    </form>
    <Footer />
  </div>
);

export default Login;

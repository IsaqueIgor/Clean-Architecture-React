import React from 'react';
import Styles from './login-styles.scss';
import { LoginHeader, Footer, Spinner } from '@/presentation/components';

const Login: React.FC = () => (
  <div className={Styles.loginWrap}>
    <LoginHeader />
    <form data-testid='form' className={Styles.form}>
      <h2>Login</h2>
      <div className={Styles.inputWrap}>
        <input type='email' name='email' placeholder='email@email.com' />
        <span className={Styles.status}>🔴</span>
      </div>
      <div className={Styles.inputWrap}>
        <input type='password' name='password' placeholder='Password' />
        <span className={Styles.status}>🔴</span>
      </div>
      <button className={Styles.submit} type='submit'>
        Enter
      </button>
      <span className={Styles.link}>Create Account</span>
      <div className={Styles.errorWrap}>
        <Spinner className={Styles.spinner} />
        <span className={Styles.error}>Error</span>
      </div>
    </form>
    <Footer />
  </div>
);

export default Login;

import React from 'react';
import Styles from './login-styles.scss';
import { LoginHeader } from '@/presentation/components';

const Login: React.FC = () => (
  <div className={Styles.loginWrap}>
    <LoginHeader />
    <form data-testid='form' className={Styles.form}>
      <h2>Login</h2>
      <input type='email' name='email' placeholder='Digite seu e-mail' />
      <input type='password' name='password' placeholder='Digite sua senha' />
    </form>
  </div>
);

export default Login;

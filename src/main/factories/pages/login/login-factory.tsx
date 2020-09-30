import React from 'react';

import { Login } from '@/presentation/pages';
import { makeRemoteAuthentication } from '@/main/factories/usercases/authentication/remote-authentication-factory';

import { makeLoginValidation } from './login-validation-factory';
import { makeLocalSaveAccessToken } from '../../usercases/save-access-token/local-save-access-token-factory';

export const makeLogin: React.FC = () => (
  <Login
    authentication={makeRemoteAuthentication()}
    validation={makeLoginValidation()}
    saveAccessToken={makeLocalSaveAccessToken()}
  />
);

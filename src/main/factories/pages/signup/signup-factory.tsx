import React from 'react';

import { SignUp } from '@/presentation/pages';
import { makeRemoteAddAccount } from '@/main/factories/usercases/add-account/remote-add-account-factory';

import { makeSignUpValidation } from './signup-validation-factory';

export const makeSignUp: React.FC = () => (
  <SignUp
    addAccount={makeRemoteAddAccount()}
    validation={makeSignUpValidation()}
  />
);

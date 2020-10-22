import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { SurveyList } from '@/presentation/pages';
import { makeLogin } from '@/main/factories/pages/login/login-factory';
import { makeSignUp } from '@/main/factories/pages/signup/signup-factory';
import { ApiContext } from '@/presentation/contexts';
import { setCurrentAccountAdapter } from '@/main/adapters/current-account-adapter';

const Router: React.FC = () => (
  <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountAdapter }}>
    <BrowserRouter>
      <Switch>
        <Route path="/Login" exact component={makeLogin} />
        <Route path="/signup" exact component={makeSignUp} />
        <Route path="/" exact component={SurveyList} />
      </Switch>
    </BrowserRouter>
  </ApiContext.Provider>
);

export default Router;

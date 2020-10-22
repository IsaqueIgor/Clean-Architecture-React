import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { SurveyList } from '@/presentation/pages';
import { makeLogin } from '@/main/factories/pages/login/login-factory';
import { makeSignUp } from '@/main/factories/pages/signup/signup-factory';

const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/Login" exact component={makeLogin} />
      <Route path="/signup" exact component={makeSignUp} />
      <Route path="/" exact component={SurveyList} />
    </Switch>
  </BrowserRouter>
);

export default Router;

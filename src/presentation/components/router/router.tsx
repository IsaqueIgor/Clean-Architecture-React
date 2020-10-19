import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { SurveyList } from '@/presentation/pages';

type Factory = {
  makeLogin: React.FC;
  makeSignUp: React.FC;
};

const Router: React.FC<Factory> = (factory: Factory) => (
  <BrowserRouter>
    <Switch>
      <Route path="/Login" exact component={factory.makeLogin} />
      <Route path="/signup" exact component={factory.makeSignUp} />
      <Route path="/" exact component={SurveyList} />
    </Switch>
  </BrowserRouter>
);

export default Router;

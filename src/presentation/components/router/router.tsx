import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

type Factory = {
  makeLogin: React.FC;
  makeSignUp: React.FC;
};

const Router: React.FC<Factory> = (factory: Factory) => (
  <BrowserRouter>
    <Switch>
      <Route path="/Login" exact component={factory.makeLogin} />
      <Route path="/signup" exact component={factory.makeSignUp} />
    </Switch>
  </BrowserRouter>
);

export default Router;

import React from 'react';  
import { Route, IndexRoute } from 'react-router';
import App from './components/app';  
import NotFoundPage from './components/pages/not-found-page';
import HomePage from './components/pages/home-page';  
import Dashboard from './components/dashboard';  
import RequireAuth from './components/auth/require-auth';
//import EntityNew from './components/pages/entity/entityNew';
import EntityNew from './components/pages/entity/entityNew';

export default (  
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="dashboard" component={RequireAuth(Dashboard)} />
    <Route path="entity/new" component={RequireAuth(EntityNew)} />

    <Route path="*" component={NotFoundPage} />
  </Route>
);

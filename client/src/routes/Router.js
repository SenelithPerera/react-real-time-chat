import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Chat } from '../components/chat/Chat';
import { Join } from '../components/SignIn/Join';

import { Routes } from './Routes';


export const MainRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={Routes.join} component={Join} />
        <Route exact path={Routes.chat} component={Chat} />
      </Switch>
    </Router>
  )
}

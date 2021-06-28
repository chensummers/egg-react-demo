// Router.js
import React from 'react';
import Index from '@/pages'
import Diary from '@/pages/diary';
import Detail from '@/pages/diary/detail';
import Edit from '@/pages/diary/edit';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const RouterMap = () => {
  return <Router>
    <Switch>
      <Route exact path="/" component={Index} />
      <Route exact path="/diary" component={Diary} />
      <Route  path="/diary/detail" component={Detail} />
      <Route  path="/diary/edit" component={Edit} />
        
    </Switch>
  </Router>
}

export default RouterMap;

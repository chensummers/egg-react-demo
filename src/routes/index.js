// Router.js
import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  withRouter
} from "react-router-dom";
import routes from './route.js';

const RouterMap = () => (
  <Router>

    <Suspense fallback={<div></div>}>
      <Switch>
        {
          routes.map((route, index) => {
            if(route.redirectTo) {
              return <Redirect from={route.path} to={route.redirectTo} key={index}/>
            }else {
              return <Route {...route} key={index} />
            }
          })
        }
      </Switch>
    </Suspense>

  </Router>
)

export default RouterMap;

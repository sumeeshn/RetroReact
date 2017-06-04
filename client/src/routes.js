import React from 'react';
import {
  Router,
  Route,
  hashHistory,
  IndexRoute
} from 'react-router';
import { Home, Welcome, About, Contact, Archive } from './components';
import { GameContainer, AddGameContainer } from './containers';


// hashHistory for easier development
const routes = (
  <Router history={hashHistory}>
    <Route path='/' component={Home}>
      <IndexRoute component={Welcome} />
      <Route path='/about' component={About}/>
      <Route path='/contact' component={Contact}/>
    </Route>
    <Route path='/games' component={Archive}>
      <IndexRoute component={GameContainer} />
      <Route path='add' component={AddGameContainer}/>
    </Route>
  </Router>
)

export default routes;

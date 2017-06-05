import React from 'react';
// importing provider
import { Provider } from 'react-redux';
// import store
import configureStore from './store';
import {
  Router,
  Route,
  hashHistory,
  IndexRoute
} from 'react-router';
import { Home, Welcome, About, Contact, Archive } from './components';
import { GameContainer, AddGameContainer } from './containers';


const store = configureStore();

// hashHistory for easier development
const routes = (
  <Provider store={store}>
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
  </Provider>
)

export default routes;

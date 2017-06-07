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
import { Home, Welcome, About, Contact, Archive, Login, Signup } from './components';
import { GameContainer, AddGameContainer } from './containers';
import { syncHistoryWithStore } from 'react-router-redux';
import ReduxToastr from 'react-redux-toastr';
import userAuthenticated from './utils/authWrapper';

const store = configureStore();
// sync navigation events with the store
const history = syncHistoryWithStore(hashHistory, store, {
  selectLocationState(state) {
    return state.get('routing').toObject();
  }
})

// defining rules for the wrapper
const options = {
  authSelector: state => state.get('auth'),
  predicate: auth => auth.get('isAuthenticated'),
  redirectAction: ({ pathname, query }) => {
    if(query.redirect) {
    // If the user is not logged in go to /auth/login
      return push(`auth${pathname}?next=${query.redirect}`);
    }
  },
  wrapperDisplayName: 'UserIsJWTAuthenticated'
};
const requireAuthentication = userAuthenticated(options);

// hashHistory for easier development
const routes = (
  <Provider store={store}>
    <div className='wrapper'>
      <Router history={hashHistory}>
        <Route path='/' component={Home}>
          <IndexRoute component={Welcome} />
          <Route path='/about' component={About}/>
          <Route path='/contact' component={Contact}/>
        </Route>
        <Route path='/games' component={Archive}>
          <IndexRoute component={GameContainer} />
          <Route path='add' component={requireAuthentication(AddGameContainer)}/>
        </Route>
        <Route path='/auth' component={Archive}>
          <Route path='login' component={Login} />
          <Route path="signup" component={Signup} />
        </Route>
      </Router>
      <ReduxToastr
        timeOut={2000}
        newestOnTop={false}
        preventDuplicates={true}
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
      />
    </div>
  </Provider>
)

export default routes;

import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';
import games from './games';
import filestack from './filestack';
import routing from './routing';
import auth from './auth';
import { reducer as toastr} from 'react-redux-toastr'

export default combineReducers({
  games,
  filestack,
  form,
  routing,
  auth,
  toastr
});

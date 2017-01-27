import { combineReducers } from 'redux';
import flashMessages from './flashMessages';
import auth, * as fromAuth from './auth';

const root = combineReducers({
  flashMessages,
  auth,
});

export const isAuthenticated = (state) => fromAuth.isAuthenticated(state.auth);

export default root;

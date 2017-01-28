import { combineReducers } from 'redux';
import flashMessages from './flashMessages';
import authenticate, * as fromAuthenticate from './authenticate';
import users from './users';

const root = combineReducers({
  flashMessages,
  authenticate,
  users,
});

export const isAuthenticated = state =>
  fromAuthenticate.isAuthenticated(state.authenticate);

export const getAuthenticatedUserId = state =>
  fromAuthenticate.getAuthenticatedUserId(state.authenticate);

export default root;

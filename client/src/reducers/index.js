import { combineReducers } from 'redux';
import flashMessages from './flashMessages';
import authenticate, * as fromAuthenticate from './authenticate';
import users from './users';
import paths, * as fromPaths from './paths';

const root = combineReducers({
  flashMessages,
  authenticate,
  users,
  paths,
});

export const isAuthenticated = state =>
  fromAuthenticate.isAuthenticated(state.authenticate);

export const getAuthenticatedUserId = state =>
  fromAuthenticate.getAuthenticatedUserId(state.authenticate);

export const getAllPaths = state => fromPaths.getAllPaths(state.paths);

export default root;

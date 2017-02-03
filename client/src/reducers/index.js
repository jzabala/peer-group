import { combineReducers } from 'redux';
import flashMessages from './flashMessages';
import auth, * as fromAuthenticate from './auth';
import users from './users';
import paths, * as fromPaths from './paths';

const root = combineReducers({
  flashMessages,
  auth,
  users,
  paths,
});

export const isAuthenticated = state =>
  fromAuthenticate.isAuthenticated(state.auth);

export const getAuthenticatedUserId = state =>
  fromAuthenticate.getAuthenticatedUserId(state.auth);

export const getAllPaths = state =>
  fromPaths.getAllPaths(state.paths);

export const getPath = (state, id) =>
  fromPaths.getPath(state.paths, id);

export const getMilestones = (state, ids) =>
  fromPaths.getMilestones(state.paths, ids);

export const getCurrentPathId = (state) =>
  fromPaths.getCurrentPathId(state.paths);

export const getCurrentPathIsFeching = (state) =>
  fromPaths.getCurrentPathIsFeching(state.paths);

export default root;

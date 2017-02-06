import { combineReducers } from 'redux';
import flashMessages from './flashMessages';
import auth, * as fromAuth from './auth';
import users from './users';
import paths, * as fromPaths from './paths';

const root = combineReducers({
  flashMessages,
  auth,
  users,
  paths,
});

export const isAuthenticated = state =>
  fromAuth.isAuthenticated(state.auth);

export const getAuthenticatedUsername = state =>
  fromAuth.getAuthenticatedUsername(state.auth);

export const getAllPaths = state =>
  fromPaths.getAllPaths(state.paths);

export const getPath = (state, url) =>
  fromPaths.getPath(state.paths, url);

export const getMilestones = (state, ids) =>
  fromPaths.getMilestones(state.paths, ids);

export const getUserMilestones = (state, ids) =>
  fromAuth.getUserMilestones(state.auth, ids);

export default root;

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
export const getPath = (id, state) =>
  fromPaths.getPath(id, state.paths);
export const getMilestones = (milestoneIds, state) =>
  fromPaths.getPath(milestoneIds, state.paths);

export default root;

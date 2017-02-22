import api from '../api';
import client from '../graphql/client';
import * as fromPaths from './paths';
import * as fromUsers from './users';

export const fetchPaths = fromPaths.fetchPaths(client);
export const createPath = fromPaths.createPath(api);
export const fetchUsersInProgress = fromPaths.fetchUsersInProgress(api);

export const saveUserPathStatus = fromUsers.saveUserPathStatus(api);
export const fetchUserPath = fromUsers.fetchUserPath(api);

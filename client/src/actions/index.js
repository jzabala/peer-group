import api from '../api';
import * as fromPaths from './paths';
import * as fromUsers from './users';

export const createPath = fromPaths.createPath(api);
export const fetchPaths = fromPaths.fetchPaths(api);
export const fetchPath = fromPaths.fetchPath(api);

export const saveUserPathStatus = fromUsers.saveUserPathStatus(api);

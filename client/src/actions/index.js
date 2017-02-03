import api from '../api';
import * as fromPaths from './paths';

export const createPath = fromPaths.createPath(api);
export const fetchPaths = fromPaths.fetchPaths(api);
export const fetchCurrentPath = fromPaths.fetchCurrentPath(api);

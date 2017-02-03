import api from '../api';
import * as fromPaths from './paths';

export const createPath = fromPaths.createPath(api);
export const fetchPaths = fromPaths.fetchPaths(api);
export const fetchPath = fromPaths.fetchPath(api);

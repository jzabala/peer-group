import { api } from '../api';
import { normalizePath, normalizePaths } from '../normalizers';

export const createPath = path => dispatch => {
  return api.post('/paths', path)
    .then(
      ({ data }) => dispatch({
        type: 'ADD_PATH',
        paths: normalizePath(data),
      }),
      ({ response }) => Promise.reject(response.data.errors),
    );
}

export const fetchPaths = () => dispatch => {
  return api.get('/paths').then(
    ({ data }) => dispatch({
      type: 'FETCH_PATHS',
      paths: normalizePaths(data),
    })
  );
}

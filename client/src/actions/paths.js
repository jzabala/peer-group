import { normalizePath, normalizePaths } from '../normalizers';

export const createPath = api => path => dispatch => (
  api.post('/paths', path).then(
    ({ data }) => dispatch({
      type: 'ADD_PATH',
      paths: normalizePath(data),
    }),
    ({ response }) => Promise.reject(response.data.errors),
  )
);

export const fetchPaths = api => () => dispatch => (
  api.get('/paths').then(
    ({ data }) => dispatch({
      type: 'FETCH_PATHS',
      paths: normalizePaths(data),
    })
  )
);

import { normalizePath, normalizePaths } from '../normalizers';

export const createPath = api => path => dispatch => (
  api.post('/paths', path).then(
    ({ data }) => dispatch({
      type: 'ADD_PATH',
      response: normalizePath(data),
    }),
    ({ response }) => Promise.reject(response.data.errors),
  )
);

export const fetchPaths = api => () => dispatch => {
  dispatch({
    type: 'FETCH_PATHS_REQUEST'
  });

  return api.get('/paths').then(
    ({ data }) => dispatch({
      type: 'FETCH_PATHS_SUCCESS',
      response: normalizePaths(data),
    })
  )
};

export const fetchPath = api => pathUrl => dispatch => {
  dispatch({
    type: 'FETCH_PATH_REQUEST'
  });

  return api.get(`/paths/${pathUrl}`).then(
    ({ data }) => dispatch({
      type: 'FETCH_PATH_SUCCESS',
      response: normalizePath(data),
    }),
    ({ response }) => {
      dispatch({ type: 'FETCH_PATH_FAILURE' });
      return Promise.reject(response.data.errors);
    }
  );
}

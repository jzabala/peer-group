import { normalizePath, normalizePaths } from '../normalizers';
import { whenError500 } from '../utils/handlers';

export const createPath = api => path => dispatch => (
  api.post('/paths', path).then(
    ({ data }) => dispatch({
      type: 'ADD_PATH',
      response: normalizePath(data),
    }),
    ({ response }) => {
      if (!whenError500(dispatch, response)) {
       return Promise.reject(response.data.errors);
      }
    }
  )
);

export const fetchPaths = api => urlSegment => dispatch => {
  let url = '/paths';
  if (urlSegment) {
    url += `/${urlSegment}`;
  }

  dispatch({
    type: 'FETCH_PATHS_REQUEST'
  });

  return api.get(url).then(
    ({ data }) =>
    dispatch({
      type: 'FETCH_PATHS_SUCCESS',
      response: normalizePaths(data),
    }),
    ({ response }) => {
      whenError500(dispatch, response);
      dispatch({
        type: 'FETCH_PATHS_FAILURE'
      });
      return Promise.reject(response);
    }
  )
};

export const fetchUsersInProgress = api => (pathUrl, milestoneId) =>
  api.get(`paths/${pathUrl}/milestones/${milestoneId}/users/in-progress`)
    .then(
      ({ data }) => data,
      ({ response }) => Promise.reject(response.data.errors),
    );

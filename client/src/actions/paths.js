import { normalizePath, normalizePaths } from '../normalizers';
import { whenError500 } from '../utils/handlers';

// fetchPaths :: client -> query -> urlSegment -> dispatch -> Promise
export const fetchPaths = client => (query, url) => dispatch => {

  const variables = url ? { url } : {};
  dispatch({
    type: 'FETCH_PATHS_REQUEST'
  });

  client.query({ query, variables }).then(
    ({ data: { paths } }) => dispatch({
      type: 'FETCH_PATHS_SUCCESS',
      response: normalizePaths(paths),
    })
    // TODO: handle errors for graphql
    /* ,
    ({ response }) => {
      whenError500(dispatch, response);
      dispatch({
        type: 'FETCH_PATHS_FAILURE'
      });
      return Promise.reject(response);
    }*/
  )
};

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

export const fetchUsersInProgress = api => (pathUrl, milestoneId) =>
  api.get(`paths/${pathUrl}/milestones/${milestoneId}/users/in-progress`)
    .then(
      ({ data }) => data,
      ({ response }) => Promise.reject(response.data.errors),
    );

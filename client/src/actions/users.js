import { normalizeUserMilestone, normalizeUserMilestones } from '../normalizers';
import { isAuthenticated } from '../reducers';

export const saveUserPathStatus = api => userPath => (dispatch, getState) => {
  if (!isAuthenticated(getState())) {
    return;
  }

  dispatch({
    type: 'SAVE_USER_PATH_STATUS_REQUEST',
    response: normalizeUserMilestone(userPath.milestone),
  });

  return api.post('/users/paths', userPath).then(
    ({ data }) => dispatch({
      type: 'SAVE_USER_PATH_STATUS_SUCCESS',
      response: normalizeUserMilestones(data),
    }),
    ({ response }) => {
      dispatch({ type: 'SAVE_USER_PATH_STATUS_FAILURE' });
      return Promise.reject(response.data.errors);
    }
  );
}

export const fetchUserPath = api => url => (dispatch, getState) => {
  if (!isAuthenticated(getState())) {
    return;
  }

  dispatch({
    type: 'FETCH_USER_PATH_REQUEST'
  });

  return api.get(`/users/paths/${url}`).then(
    ({ data }) => dispatch({
      type: 'FETCH_USER_PATH_SUCCESS',
      response: normalizeUserMilestones(data),
    }),
    ({ response }) => {
      dispatch({ type: 'FETCH_USER_PATH_FAILURE' });
      if (response.status !== 404) {
        return Promise.reject(response.data.errors);  
      }
    }
  );
}

import { normalizeUserMilestone, normalizeUserMilestones } from '../normalizers';

export const saveUserPathStatus = api => userPath => dispatch => {
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

export const fetchUserPath = api => url => dispatch => {
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
      return Promise.reject(response.data.errors);
    }
  );
}

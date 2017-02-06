import { normalizeUserMilestone } from '../normalizers';

export const saveUserPathStatus = api => userPath => dispatch => {  
  dispatch({
    type: 'SAVE_USER_PATH_STATUS_REQUEST',
    response: normalizeUserMilestone(userPath.milestone),
  });
}

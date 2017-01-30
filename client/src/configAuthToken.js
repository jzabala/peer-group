import { getAuthToken, authenticateUser } from './utils/authTokenHandler';

const configAuthToken = (dispatch) => {
  const token = getAuthToken();
  if (token) {
    authenticateUser(dispatch, token);
  }
}

export default configAuthToken;

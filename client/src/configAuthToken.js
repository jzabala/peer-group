import { getAuthToken } from './utils/authTokenHandler';
import { authenticateUser } from './actions/auth'

const configAuthToken = (dispatch) => {
  const token = getAuthToken();  
  if (token) {
    authenticateUser(dispatch)(token);
  }
}

export default configAuthToken;

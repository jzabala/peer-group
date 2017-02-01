import api from '../api';
import * as fromAuthHandler from '../utils/authTokenHandler';
import { normalizeUser } from '../normalizers';

export const signup = user => api.post('/users', user).then(null,
  ({ response }) => Promise.reject(response.data.errors),
);

export const loginUser = (user) => ({
  type: 'LOGIN_USER',
  users: normalizeUser(user),
});

export const login = user => dispatch => {
  return api.post('/authenticate', user).then(
    ({ data }) => {
      fromAuthHandler.storeAuthToken(data.token);
      fromAuthHandler.authenticateUser(dispatch, data.token);
    },
    ({ response }) => Promise.reject(response.data.errors),
  );
}

export const logout = (id) => dispatch => {
  fromAuthHandler.removeAuthToken();
  fromAuthHandler.deleteAuthTokenRequest();
  dispatch({ type: 'LOGOUT_USER' });
  dispatch({
    type: 'REMOVE_USER',
    userId: id
  });
}

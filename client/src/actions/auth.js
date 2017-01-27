import { api } from '../api';
import * as fromAuth from '../utils/authTokenHandler';
import { normalizeUser } from '../normalizers';

export const signup = user => api.post('/users', user);

export const setAuthenticatedUser = (user) => ({
  type: 'SET_LOGGED_USER',
  users: normalizeUser(user),
});

export const login = user => dispatch => {
  return api.post('/authenticate', user).then(
    ({ data }) => {
      fromAuth.storeAuthToken(data.token);
      fromAuth.authenticateUser(dispatch, data.token);
    },
    ({ response }) => Promise.reject(response.data.errors),
  );
}

export const logout = () => dispatch => {
  fromAuth.removeAuthToken();
  fromAuth.deleteAuthTokenRequest();
  dispatch(setAuthenticatedUser({}));
}

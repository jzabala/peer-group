import { api } from '../api';
import * as fromAuth from '../utils/authTokenHandler';
import { normalizeUser } from '../normalizers';
import { removeUser } from './users';

export const signup = user => api.post('/users', user).then(null,
  ({ response }) => Promise.reject(response.data.errors),
);

export const loginUser = (user) => ({
  type: 'LOGIN_USER',
  users: normalizeUser(user),
});

const logoutUser = () => ({
  type: 'LOGOUT_USER',
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

export const logout = (id) => dispatch => {
  fromAuth.removeAuthToken();
  fromAuth.deleteAuthTokenRequest();
  dispatch(logoutUser());
  dispatch(removeUser(id));
}

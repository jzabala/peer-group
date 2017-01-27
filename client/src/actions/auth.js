import jwtDecode from 'jwt-decode';
import { api } from '../api';
import { storeAuthToken, setAuthTokenRequest } from '../utils/authTokenHandler';

export const signup = (user) => api.post('/users', user);

const setAuthenticatedUser = (user) => ({
  type: 'SET_LOGGED_USER',
  user,
});

export const login = (user) => (dispath) => {
  return api.post('/authenticate', user).then(
    ({ data }) => {
      storeAuthToken(data.token);
      setAuthTokenRequest(data.token);
      const decoded = jwtDecode(data.token);
      dispath(setAuthenticatedUser(decoded.user));
    },
    ({ response }) => Promise.reject(response.data.errors),
  );
}

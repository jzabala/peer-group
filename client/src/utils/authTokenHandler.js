import axios from 'axios';
import jwtDecode from 'jwt-decode';
import R from 'ramda';
import { setAuthenticatedUser } from '../actions/auth';

const Authorization = 'x-access-token';
const authToken = 'authToken';

export const storeAuthToken = (token) => {
  localStorage.setItem(authToken, token);
  return token;
}

export const getAuthToken = () => localStorage.getItem(authToken);

export const removeAuthToken = () => {
  localStorage.removeItem(authToken);
}

export const setAuthTokenRequest = (token) => {
  axios.defaults.headers.common[Authorization] = token;
  return token;
}

export const deleteAuthTokenRequest = () => {
  delete axios.defaults.headers.common[Authorization];
}

export const authenticateUser = R.curry(
  (dispatch, token) => R.compose(
    dispatch,
    setAuthenticatedUser,
    R.prop('user'),
    jwtDecode,
    setAuthTokenRequest,
  )(token)
)

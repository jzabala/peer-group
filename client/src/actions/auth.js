import R from 'ramda';
import jwtDecode from 'jwt-decode';
import api from '../api';
import * as fromAuthHandler from '../utils/authTokenHandler';
import {normalizeUser} from '../normalizers';
import React from 'react';

export const signup = user => api.post('/users', user).then(null,
  ({ response }) => Promise.reject(response.data.errors),
);

const loginUser = (user) => ({
  type: 'LOGIN_USER',
  response: normalizeUser(user),
});

export const authenticateUser = dispatch => R.compose(
    dispatch,
    loginUser,
    R.prop('user'),
    jwtDecode,
    fromAuthHandler.setAuthTokenRequest,
  );

export const login = user => dispatch => {
  return api.post('/authenticate', user).then(
    ({data}) => {
      fromAuthHandler.storeAuthToken(data.token);
      authenticateUser(dispatch)(data.token);
    },
    ({response}) => Promise.reject(response.data.errors),
  );
}

export const logout = (username) => dispatch => {
  fromAuthHandler.removeAuthToken();
  fromAuthHandler.deleteAuthTokenRequest();
  dispatch({type: 'LOGOUT_USER'});
  dispatch({
    type: 'REMOVE_USER',
    userId: username
  });
}

export const countryList = (name) => {
   const response = api.get(`/users/getCountryList?url_city=${name}`);
   return response;
}

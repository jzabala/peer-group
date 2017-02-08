import axios from 'axios';

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

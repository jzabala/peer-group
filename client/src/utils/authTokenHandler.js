import axios from 'axios';

const Authorization = 'x-access-token';
const authToken = 'authToken';

export const storeAuthToken = (token) => {
  localStorage.setItem(authToken, token);  
}

export const removeAuthToken = () => {
  localStorage.removeItem(authToken);
}

export const setAuthTokenRequest = (token) => {
  axios.defaults.headers.common[Authorization] = token;
}

export const removeAuthTokenRequest = () => {
  delete axios.defaults.headers.common[Authorization];
}

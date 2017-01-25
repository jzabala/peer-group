import { api } from '../api';

export const signup = (user) => api.post('users', user);

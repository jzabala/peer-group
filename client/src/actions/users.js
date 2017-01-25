import { api } from '../api';

export const signup = (user) => api.posrt('users', user);

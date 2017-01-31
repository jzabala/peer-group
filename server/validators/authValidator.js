import { validateAsync } from '../utils/functions';

export const validateAuth = validateAsync({
  email: {
    presence: true,
  },
  password: {
    presence: true,
  },
});

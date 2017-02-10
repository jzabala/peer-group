import { validateAsync } from '../utils/functions';

export const validateAuth = validateAsync({
  identifier: {
    presence: {
      message: '^You have to enter a username or email',
    },
  },
  password: {
    presence: true,
  },
});

import { validateAsync } from '../utils/functions';

export const validateSignup = validateAsync({
  username: {
    presence: {
      message: "^Username can't be black",
    },
    format: {
      pattern: /^[a-z0-9]+[a-z0-9-]*/,
      message: '^Username may only contain alphanumeric characters or single hyphens, and cannot begin with a hyphen',
    },
  },
  email: {
    presence: true,
    email: {
      message: 'is not a valid'
    },
  },
  password: {
    presence: true,
  },
  confirmPassword: {
    presence: true,
    equality: 'password',
  },
});

export const validateLogin = validateAsync({
  username: {
    presence: {
      message: "^Username can't be black",
    },
  },
  password: {
    presence: true,
  },
});

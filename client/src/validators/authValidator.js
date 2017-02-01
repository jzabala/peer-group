import { validateAsync } from '../utils/functions';

export const validateSignup = validateAsync({
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
  country:{
    presence: true
  },
  city:{
    presence: true
  }
});

export const validateLogin = validateAsync({
  email: {
    presence: true,
  },
  password: {
    presence: true,
  },
});

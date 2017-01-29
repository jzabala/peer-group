import validate from 'validate.js';
import User from '../models/user';
import { validateAsync } from '../utils/functions';

validate.validators.emailExists = (value, options) => {
  if (options) {
    return new validate.Promise((resolve) => {
      User.findOne({ email: value }).then(
        (user) => user ? resolve('exists.') : resolve(),
      );
    });
  }
  return null;
};


export const validateNewUser = validateAsync({
  email: {
    presence: true,
    email: true,
    emailExists: true,
  },
  password: {
    presence: true,
  },
  confirmPassword: {
    presence: true,
    equality: 'password',
  },
});

import validate from 'validate.js';
import User from '../models/user';

validate.validators.userExists = (value, options) => {
  if (options) {
    return new validate.Promise((resolve) => {
      User.findOne({ email: value }).then(
        (user) => {
          if (user) {
            resolve('exists.');
          } else {
            resolve();
          }
        },
      );
    });
  }
  return null;
};


export const newUserConstrains = {
  email: {
    presence: true,
    email: true,
    userExists: true,
  },
  password: {
    presence: true,
  },
  confirmPassword: {
    presence: true,
    equality: 'password',
  },
};

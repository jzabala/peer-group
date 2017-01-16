import validate from 'validate.js';
import User from '../models/user';

validate.validators.userExists = (value, options) => {
  if (options) {
    return new validate.Promise((resolve, reject) => {
      User.findOne({ email: value }).then(
        (user) => {
          if (user) {
            resolve('already exists.');
          }
          resolve();
        },
      );
    });
  }
  return null;
};

export const newUser = {
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

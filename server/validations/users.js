import validate from 'validate.js';
import Users from '../models/users';

validate.validators.userExists = (value, options) => {
  if (options) {
    return new validate.Promise((resolve) => {
      Users.findOne({ email: value }).then(
        (user) => {
          if (user) {
            resolve('exists.');
          }
          resolve();
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

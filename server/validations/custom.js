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

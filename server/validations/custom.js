import validate from 'validate.js';
import User from '../models/user';

validate.validators.userExists = (value, options) => {
  if (options) {
    return new validate.Promise((resolve) => {
      User.findOne({ email: value }).then(
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

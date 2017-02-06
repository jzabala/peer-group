import validate from 'validate.js';
import User from '../models/user';
import { validateAsync } from '../utils/functions';
import * as custom from './customValidations';

validate.validators.pathNotExists = custom.pathNotExists;
validate.validators.milestoneNotExists = custom.milestoneNotExists;
validate.validators.validStatus = custom.validStatus;

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

validate.validators.usernameExists = (value, options) => {
  if (options) {
    return new validate.Promise((resolve) => {
      User.findOne({ username: value }).then(
        (user) => user ? resolve('exists.') : resolve(),
      );
    });
  }
  return null;
};

export const validateNewUser = validateAsync({
  username: {
    presence: true,
    usernameExists: true,
    format: {
      pattern: /^[a-z0-9]+[a-z0-9-]*/,
      message: 'may only contain alphanumeric characters or single hyphens, and cannot begin with a hyphen',
    },
  },
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

export const validateUserPath = validateAsync({
  pathUrl: {
    presence: true,
    pathNotExists: {
      message: '^Path not exists',
    },
  },
  username: {
    presence: true,
  },
  milestone: {
    presence: true,
    milestoneNotExists: true,
    validStatus: true,
  },
});

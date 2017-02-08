import validate from 'validate.js';
import User from '../models/user';
import { validateAsync } from '../utils/functions';
import * as custom from './customValidations';

validate.validators.pathNotExists = custom.pathNotExists;
validate.validators.milestoneNotExists = custom.milestoneNotExists;
validate.validators.milestonePercentageNumber = custom.milestonePercentageNumber;
validate.validators.milestonePercentageGreaterThanEqual =
  custom.milestonePercentageGreaterThanEqual;
validate.validators.milestonePercentageLessThanEqual =
  custom.milestonePercentageLessThanEqual;

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
    pathNotExists: true,
  },
  username: {
    presence: true,
  },
  milestone: {
    presence: true,
    milestoneNotExists: true,
    milestonePercentageNumber: true,
    milestonePercentageGreaterThanEqual: {
      $gte: 0,
    },
    milestonePercentageLessThanEqual: {
      $lte: 100,
    },
  },
});

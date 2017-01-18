import R from 'ramda';
import validate from 'validate.js';
import { newUserValidataions } from './users';
import './custom';

const validator = R.curryN(2, R.flip(validate.async));

export const validateNewUser = validator(
  {
    ...newUserValidataions,
    email: { ...newUserValidataions.email, userExists: true },
  },
);

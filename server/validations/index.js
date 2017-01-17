import R from 'ramda';
import validate from 'validate.js';
import { newUserValidataions } from './users';
import './custom';

const validator = R.curry((constraints, data) => validate.async(data, constraints));

export const validateNewUser = validator(
  {
    ...newUserValidataions,
    email: { ...newUserValidataions.email, userExists: true },
  },
);

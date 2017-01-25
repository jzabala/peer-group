import R from 'ramda';
import validate from 'validate.js';

const dots = (s) => `${s}...`;

export const truncate = (x) => R.when(
  R.propSatisfies(R.gt(R.__, x), 'length'),
  R.compose(dots, R.take(x-3))
);

export const validateAsync = R.curry(
  (constrains, data) => validate.async(data, constrains),
);

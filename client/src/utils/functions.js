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

export const trace = R.curry((tag, x) => {
  console.log(tag, x);
  return x;
});

export const kebabCase = R.compose(R.replace(/\s+/ig, '-'), R.toLower, R.trim);

export const isNotEmpty = x => !R.isEmpty(x);

import R from 'ramda';

const dots = (s) => `${s}...`;

export const truncate = (x) => R.when(
  R.propSatisfies(R.gt(R.__, x), 'length'),
  R.compose(dots, R.take(x-3))
);

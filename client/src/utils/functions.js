import R from 'ramda';

export const truncate = (x, str) => R.when(
  R.propSatisfies(R.gt(R.__, R.__), 'length'),
  R.pipe(R.take(R.__), R.append('…'), R.join(''))
);

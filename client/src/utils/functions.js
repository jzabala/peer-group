import R from 'ramda';

export const truncate = R.uncurryN(2, (x) => R.when(
  R.propSatisfies(R.gt(R.__, x), 'length'),
  R.pipe(R.take(x-3), R.append('…'), R.join(''))
));

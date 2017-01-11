import R from 'ramda';

const greateSubstring = R.curry((from, to, n, str) =>
  str && str.length > n ? str.substring(from, to) : str);

export const greateSubstringStart = greateSubstring(0);

export const addDots = R.curry((n, str) =>
  str && str.length === n ? str + '...' : str);

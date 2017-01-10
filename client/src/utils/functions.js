import R from 'ramda';

const conditionalsubstring = R.curry((from, to, greaterThan, str) => str && str.length > greaterThan ? str.substring(from, to) : str);

export const conditionalsubstringFromCero = conditionalsubstring(0);

export const addDotsAtEnd = (str) => str + '...';

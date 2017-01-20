import R from 'ramda';
import validate from 'validate.js';

export const trace = R.curry((tag, x) => {
  console.log(tag, x);
  return x;
});

export const promiseInvoker = R.invoker(2, 'then');

export const validatorAsync = R.curry(
  (constrains, attributes) => validate.async(attributes, constrains),
);

export const isNotEmpty = x => !R.isEmpty(x);

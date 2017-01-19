import R from 'ramda';
import validate from 'validate.js';
import { newUserValidataions } from './users';
import { newPathValidations, newRouteValidations } from './paths';
import './custom';

const validatorAsync = R.curryN(2, R.flip(validate.async));
// const validator = R.curryN(2, R.flip(validate));

export const validateNewUser = validatorAsync(
  {
    ...newUserValidataions,
    email: { ...newUserValidataions.email, userExists: true },
  },
);

const promiseInvoker = R.invoker(2, 'then');

/* R.map(threeArgsCall(R.__, null, R.identity)), R.map(validateNewRouteAsync) */
// const validateNewRouteAsync = validatorAsync(newRouteValidations);
const validateNewPathAsync = validatorAsync(newPathValidations);

// export const validateNewPath = validateNewPathAsync;
export const validateNewPath = R.compose(
  promiseInvoker(R.prop('route'), x => Promise.reject(x)), // Just passing Promise.reject doesn't work.
  promiseInvoker(R.prop('route'), x => Promise.reject(x)), // Just passing Promise.reject doesn't work.
  validateNewPathAsync,
);

/* R.compose(promise => promise.then(
  validateNewRouteAsync,
  Promise.reject,
), validateNewPathAsync); */

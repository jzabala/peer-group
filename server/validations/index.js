import R from 'ramda';
import { newUserConstrains } from './users';
import { newPathConstrains } from './paths';
import { promiseInvoker, validatorAsync } from '../utils/functions';

export const validateNewUser = validatorAsync(newUserConstrains);

export const validateNewPath = validatorAsync(newPathConstrains);
/*const validateNewPathAsync = validatorAsync(newPathConstrains);

const validateNewRouteAsync = R.compose(
  Promise.all,
  trace('good'),
  R.map(newRouteValidations),
  R.prop('route'),
);

export const validateNewPath = R.compose(
  // promiseInvoker(trace('promise value'), x => Promise.reject(x)), // Just passing Promise.reject doesn't work.
  promiseInvoker(validateNewRouteAsync, trace('bad')),
  validateNewPathAsync,
);
*/

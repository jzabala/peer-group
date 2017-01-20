import R from 'ramda';
import { promiseInvoker } from './functions';

export const serverError = (res, err) => res.status(500).send(err);

export const defaultNoReturn = R.uncurryN(2, res => promiseInvoker(
  () => res.end(),
  err => serverError(res, err),
));

export const defaultReturn = R.uncurryN(2, res => promiseInvoker(
  data => res.json(data),
  err => serverError(res, err),
));

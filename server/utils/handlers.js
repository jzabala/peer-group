import R from 'ramda';
import { then } from './promise';

export const serverError = (res, error) => {
  // TODO: Log error
  return res.status(500).json({ errors: { general: 'Something went wrong' } });
};

export const validationError = (res, errors) => res.status(400).json({ errors });

export const defaultNoReturn = R.uncurryN(2, res => then(
  res.end.bind(res),
  err => serverError(res, err),
));

export const return200 = R.uncurryN(2, res => then(
  res.json.bind(res),
  err => serverError(res, err),
));

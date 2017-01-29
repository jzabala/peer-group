import R from 'ramda';
import { then } from './promise';

export const serverError = (res, err) => res.status(500).send(err);

export const validationError = (res, errors) => res.status(400).json({ errors });

export const defaultNoReturn = R.uncurryN(2, res => then(
  () => res.end(),
  err => serverError(res, err),
));

export const defaultReturn = R.uncurryN(2, res => then(
  data => res.json(data),
  err => serverError(res, err),
));

import validate from 'validate.js';
import R from 'ramda';
import { then } from '../utils/promise';
import Path from '../models/path';
import { validateAsync, isNotEmpty } from '../utils/functions';

const newItemsConstrains = {
  name: {
    presence: true,
  },
};

validate.validators.itemsConstrains = (value, options) => {
  if (options && value) {
    const promises = R.compose(
      then(
        () => ({}),
        R.identity,
      ),
      validateAsync(newItemsConstrains),
    );
    const validateRoute = R.map(promises);
    const empty = R.compose(R.isEmpty, R.filter(isNotEmpty));
    return Promise.all(validateRoute(value)).then(
      R.when(empty, () => []),
    );
  }
  return null;
};

validate.validators.urlExits = (value, options) => {
  if (options) {
    return new validate.Promise((resolve) => {
      Path.findOne({ url: value }).then(
        path => path ? resolve('exists.') : resolve(),
      );
    });
  }
  return null;
};

export const validateNewPath = validateAsync({
  name: {
    presence: true,
  },
  url: {
    presence: true,
    format: {
      pattern: /[a-z0-9-]+/,
      message: 'can only contain a-z, 0-9 and -',
    },
    urlExits: true,
  },
  description: {
    presence: true,
  },
  items: {
    presence: true,
    itemsConstrains: true,
  },
  user: {
    presence: true,
  },
});

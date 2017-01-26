import validate from 'validate.js';
import R from 'ramda';
import { then } from '../utils/promise';
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

export const validateNewPath = validateAsync({
  name: {
    presence: true,
  },
  urlName: {
    presence: true,
    format: {
      pattern: /[a-z0-9-]+/,
      message: 'can only contain a-z, 0-9 and -',
    },
  },
  items: {
    presence: true,
    itemsConstrains: true,
  },
});

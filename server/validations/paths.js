import validate from 'validate.js';
import R from 'ramda';
import { then } from '../utils/promise';
import { validateAsync, isNotEmpty } from '../utils/functions';

const newRouteConstrains = {
  name: {
    presence: true,
  },
};

validate.validators.hasRoute = (value, options) => {
  if (options && value) {
    const promises = R.compose(
      then(
        () => ({}),
        R.identity
      ),
      validateAsync(newRouteConstrains)
    );

    const validateRoute = R.map(promises);
    const empty = R.compose(R.isEmpty, R.filter(isNotEmpty));
    return Promise.all(validateRoute(value)).then(
      R.when(empty, () => []),
    );
  }
  return null;
};

export const newPathConstrains = {
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
  route: {
    presence: true,
    hasRoute: true,
  },
};

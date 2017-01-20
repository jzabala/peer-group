import validate from 'validate.js';
import R from 'ramda';
import * as func from '../utils/functions';

const newRouteConstrains = {
  name: {
    presence: true,
  },
};

validate.validators.hasRoute = (value, options) => {
  if (options && value) {
    const promises = R.compose(func.promiseInvoker(() => ({}), R.identity),
    func.validatorAsync(newRouteConstrains));

    const validateRoute = R.map(promises);
    const empty = R.compose(R.isEmpty, R.filter(func.isNotEmpty));
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

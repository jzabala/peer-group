import validate from 'validate.js';
import R from 'ramda';
import { then } from '../utils/promise';
import { validateAsync, isNotEmpty } from '../utils/functions';
import { pathExits } from './customValidations';

const newMilestoneConstrains = {
  name: {
    presence: true,
  },
};

validate.validators.idExists = pathExits;

validate.validators.milestoneConstrains = (value, options) => {
  if (options && value) {
    const promises = R.compose(
      then(
        () => ({}),
        R.identity,
      ),
      validateAsync(newMilestoneConstrains),
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
  url: {
    presence: true,
    format: {
      pattern: /[a-z0-9-]+/,
      message: 'may only contain alphanumeric characters or hyphens',
    },
    idExists: true,
  },
  description: {
    presence: true,
  },
  milestones: {
    presence: true,
    milestoneConstrains: true,
  },
  username: {
    presence: true,
  },
});

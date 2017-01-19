import validate from 'validate.js';
import R from 'ramda';
import { validatorAsync, promiseInvoker, trace } from '../utils/functions';

validate.validators.hasRoute = (value, options) => {
  if (options && value) {

    //value.forEach(x => console.log(validate(x, newRouteConstrains)));
    //const promises = R.compose(promiseInvoker(x => x, x => x), validatorAsync(newRouteConstrains))
    const validate1 = R.map(validatorAsync(newRouteConstrains));
    Promise.all(validate1(value)).then(x => console.log(x), x => console.log(x));
    /*console.log(validate(value).then(x => {console.log(x); return x;}));*/
    //return Promise.all(validate(value)).then(x => {console.log(x); return x;});
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

export const newRouteConstrains = {
  name: {
    presence: true,
  },
};

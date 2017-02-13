import { Types } from 'mongoose';
import validate from 'validate.js';
import Path from '../models/path';

export const pathExits = (value, options) => {
  if (options) {
    const message = options.message || 'exists';
    return new validate.Promise((resolve) => {
      Path.findOne({ url: value }).then(
        path => path ? resolve(message) : resolve(),
      );
    });
  }
  return null;
};

export const pathNotExists = (value, options) => {
  if (options) {
    const message = options.message || 'not exists';
    return new validate.Promise((resolve) => {
      Path.findOne({ url: value }).then(
        path => path ? resolve() : resolve(message),
      );
    });
  }
  return null;
};

export const milestoneNotExists = (value, options, key, attributes) => {
  if (options) {    
    const message = options.message || 'not exists';
    const pathUrl = attributes.pathUrl;
    return new validate.Promise((resolve) => {
      Path.findOne({ url: pathUrl, 'milestones._id': new Types.ObjectId(value.milestoneId) }).then(
        path => path ? resolve() : resolve(message),
      );
    });
  }
  return null;
};

export const milestonePercentageNumber = (value, options) => {
  if (options) {
    const message = options.message || 'percentage is not a integer';
    if (!validate.isInteger(value.percentage)) {
      return message;
    }
  }
  return null;
};

export const milestonePercentageGreaterThanEqual = (value, options) => {
  if (options) {
    const message = options.message || `percentage is less than ${options.$gte}`;
    if (value.percentage < options.$gte) {
      return message;
    }
  }
  return null;
};

export const milestonePercentageLessThanEqual = (value, options) => {
  if (options) {
    const message = options.message || `percentage is greater than ${options.$lte}`;
    if (value.percentage > options.$lte) {
      return message;
    }
  }
  return null;
};

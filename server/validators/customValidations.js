import { Types } from 'mongoose';
import validate from 'validate.js';
import Path from '../models/path';
import UserPath from '../models/userPath';

export const pathExits = (value, options) => {
  if (options) {
    const message = options.message ? options.message : 'exists';
    return new validate.Promise((resolve) => {
      Path.findOne({ id: value }).then(
        path => path ? resolve(message) : resolve(),
      );
    });
  }
  return null;
};

export const pathNotExists = (value, options) => {
  if (options) {
    const message = options.message ? options.message : 'not exists';
    return new validate.Promise((resolve) => {
      Path.findOne({ id: value }).then(
        path => path ? resolve() : resolve(message),
      );
    });
  }
  return null;
};

export const milestoneNotExists = (value, options, key, attributes) => {
  if (options) {
    const message = options.message ? options.message : 'not exists';
    const id = attributes.path;
    return new validate.Promise((resolve) => {
      Path.findOne({ id, 'milestones._id': new Types.ObjectId(value.milestoneId) }).then(
        path => path ? resolve() : resolve(message),
      );
    });
  }
  return null;
};

export const validStatus = (value, options) => {
  if (options) {
    const message = options.message ? options.message : 'status not valid';
    const status = value.status;
    if (status === '' || status === 'stated' || status === 'finished') {
      return null;
    }
    return message;
  }
  return null;
};

export const milestoneStatusExists = (value, options, key, attributes) => {
  if (options) {
    const message = options.message || 'for status exists or already finished';
    const path = attributes.path;
    const user = attributes.user;
    return new validate.Promise((resolve) => {
      UserPath.findOne({
        path,
        user,
        'milestones.milestoneId': new Types.ObjectId(value.milestoneId),
        $and: [{
          $or: [
            { 'milestones.status': value.status },
            { 'milestones.status': 'finished' },
          ],
        }],
      }).then(
        userPath => userPath ? resolve(message) : resolve(),
      );
    });
  }
  return null;
};

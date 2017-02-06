import { Types } from 'mongoose';
import validate from 'validate.js';
import Path from '../models/path';
import UserPath from '../models/userPath';

export const pathExits = (value, options) => {
  if (options) {
    const message = options.message ? options.message : 'exists';
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
    const message = options.message ? options.message : 'not exists';
    const pathUrl = attributes.pathUrl;
    return new validate.Promise((resolve) => {
      Path.findOne({ pathUrl, 'milestones._id': new Types.ObjectId(value.milestoneId) }).then(
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
    const pathUrl = attributes.pathUrl;
    const username = attributes.username;
    return new validate.Promise((resolve) => {
      UserPath.findOne({
        pathUrl,
        username,
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
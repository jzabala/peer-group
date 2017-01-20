import jwt from 'jsonwebtoken';
import User from '../models/users';
import config from '../config.json';
import { serverError } from '../utils/handlers';

export default (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).json({ errors: { general: 'Faild to authenticate' } });
      } else {
        User.findOne({ email: decoded.email }, '_id email').then(
          (user) => {
            if (user) {
              // eslint-disable-next-line no-param-reassign
              req.user = user;
              next();
            } else {
              res.status(404).json({ errors: { general: 'No such user' } });
            }
          },
          error => serverError(res, error),
        );
      }
    });
  } else {
    res.status(403).json({ errors: { general: 'No token provided' } });
  }
};

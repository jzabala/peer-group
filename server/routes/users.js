import express from 'express';
import bcrypt from 'bcryptjs';
import { validateNewUser, validateUserPath } from '../validators/userValidator';
import User from '../models/user';
import UserPath from '../models/userPath';
import * as handlers from '../utils/handlers';
import { parseToUserPath } from '../utils/functions';
import authenticate from '../middlewares/authenticate';

const router = express.Router();

router.post('/', (req, res) => {
  validateNewUser(req.body).then(
    (user) => {
      const password = bcrypt.hashSync(user.password);
      new User({ ...user, password }).save().then(
        () => res.end(),
        err => handlers.serverError(res, err),
      );
    },
    (errors) => handlers.validationError(res, errors),
  );
});

router.post('/paths', authenticate, (req, res) => {
  const user = req.user;
  const requestBody = { ...req.body };
  requestBody.username = user.username;
  validateUserPath(requestBody).then(
    (requestData) => {
      const result = UserPath.findOne({ username: user.username, pathUrl: requestData.pathUrl });

      result.then(
        (dbUserPath) => {
          let userPath = dbUserPath;
          if (userPath) {
            const milestone = requestData.milestone;
            const milestones = userPath.milestones.filter(
              // eslint-disable-next-line eqeqeq
              m => m.milestoneId != milestone.milestoneId,
            );
            userPath.milestones = [...milestones, milestone];
            userPath.history.push(milestone);
          } else {
            userPath = new UserPath(parseToUserPath(requestData, user));
          }
          handlers.return200(
            res,
            userPath.save().then(
              userPathResult => userPathResult.milestones,
              err => Promise.reject(err),
            ),
          );
        },
        (error) => handlers.serverError(res, error),
      );
    },
    errors => handlers.validationError(res, errors),
  );
});

router.get('/paths/:url', authenticate, (req, res) =>
  UserPath.findOne({ username: req.user.username, pathUrl: req.params.url })
    .then(
      (userPath) => userPath ?
        res.json(userPath.milestones) :
        res.status(404).json(
          { errors: { general: 'User path not found' } },
        ),
      (error) => handlers.serverError(res, error),
      ),
    );

export default router;

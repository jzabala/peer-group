import express from 'express';
import { Types } from 'mongoose';
import R from 'ramda';
import authenticate from '../middlewares/authenticate';
import Path from '../models/path';
import UserPath from '../models/userPath';
import * as handlers from '../utils/handlers';
import { validateNewPath } from '../validators/pathValidator';

const router = express.Router();

router.post('/', authenticate, (req, res) => {
  const path = { ...req.body, username: req.user.username };
  validateNewPath(path).then(
    validPath => handlers.return200(res, new Path(validPath).save()),
    errors => handlers.validationError(res, errors),
  );
});

router.get('/', (req, res) =>
  handlers.return200(
    res,
    Path.find({}, 'url name description'),
  ));

router.get('/:url', (req, res) =>
  Path.findOne({ url: req.params.url }).then(
    (path) => path ?
      res.json(path) :
      res.status(404).json(
        { errors: { general: 'Path not found' } },
      ),
    (error) => handlers.serverError(res, error),
    ),
  );

router.get('/:url/milestones/:id/users/in-progress', (req, res) =>
  UserPath.find(
    {
      pathUrl: req.params.url,
      milestones: {
        $elemMatch: {
          milestoneId: new Types.ObjectId(req.params.id),
          percentage: { $gt: 0, $lt: 100 },
        },
      },
    },
    'username',
  ).then(
    (users) => !R.isEmpty(users) ?
      res.json(users) :
      res.status(404).json(
        { errors: { general: 'Not users in progress' } },
      ),
    (error) => handlers.serverError(res, error),
    ),
  );

export default router;

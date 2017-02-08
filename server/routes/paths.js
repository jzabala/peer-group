import express from 'express';
import authenticate from '../middlewares/authenticate';
import Path from '../models/path';
import * as handlers from '../utils/handlers';
import { validateNewPath } from '../validators/pathValidator';

const router = express.Router();

router.post('/', authenticate, (req, res) => {
  const path = { ...req.body, user: req.user.id };
  validateNewPath(path).then(
    validPath => {
      console.log(validPath);
      handlers.defaultReturn(res, new Path(validPath).save());
    },
    errors => handlers.validationError(res, errors),
  );
});

router.get('/', (req, res) =>
  handlers.defaultReturn(
    res,
    Path.find({}, 'name description url'),
  ));

export default router;

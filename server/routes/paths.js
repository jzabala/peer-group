import express from 'express';
import authenticate from '../middlewares/authenticate';
import Path from '../models/path';
import * as handlers from '../utils/handlers';
import { validateNewPath } from '../validators/pathValidator';

const router = express.Router();

router.post('/', authenticate, (req, res) => {
  const path = { ...req.body, user: req.user.id };
  validateNewPath(path).then(
    validPath => handlers.return200(res, new Path(validPath).save()),
    errors => handlers.validationError(res, errors),
  );
});

router.get('/', (req, res) =>
  handlers.return200(
    res,
    Path.find({}, 'id name description'),
  ));

router.get('/:id', (req, res) =>
  Path.findOne({ id: req.params.id }).then(
    (path) => path ?
      res.json(path) :
      res.status(404).json(
        { errors: { general: 'Path not found' } },
      ),
    (error) => handlers.serverError(res, error),
    ),
  );

export default router;

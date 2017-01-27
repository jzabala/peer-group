import express from 'express';
import authenticate from '../middlewares/authenticate';
import Path from '../models/path';
import * as handlers from '../utils/handlers';
import { validateNewPath } from '../validators/pathValidator';

const router = express.Router();

router.post('/', authenticate, (req, res) => {
  const path = { ...req.body, user: req.user.id };
  const defaultNoReturn = handlers.defaultNoReturn(res);
  validateNewPath(path).then(
    () => defaultNoReturn(new Path(path).save()),
    errors => res.json({ errors }),
  );
});

router.get('/', (req, res) => {
  handlers.defaultReturn(
    res,
    Path.find({}, '_id name urlName route._id route.name'),
  );
});

export default router;

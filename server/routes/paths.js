import express from 'express';
import authenticate from '../middlewares/authenticate';
import Paths from '../models/paths';
import { serverError } from '../utils/errorHandler';

const router = express.Router();

// TODO: Add validation
router.post('/', authenticate, (req, res) => {
  new Paths({ ...req.body, user: req.user.id }).save()
  .then(
    path => console.log(path),
    err => console.log(err),
  ).then(() => res.end());
  res.end();
});

router.get('/', (req, res) => {
  Paths.find({}, '_id name urlName route._id route.name')
  .then(
    paths => res.json(paths),
    err => serverError(res, err),
  );
});

export default router;

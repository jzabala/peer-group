import express from 'express';
import bcrypt from 'bcryptjs';
import { validateNewUser } from '../validators/userValidator';
import User from '../models/user';
import { serverError } from '../utils/handlers';

const router = express.Router();

router.post('/', (req, res) => {
  validateNewUser(req.body).then(
    (user) => {
      const password = bcrypt.hashSync(user.password);
      new User({ ...user, password }).save().then(
        () => res.end(),
        err => serverError(res, err),
      );
    },
    (errors) => {
      res.status(400).json({ errors });
    },
  );
});

export default router;

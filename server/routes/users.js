import express from 'express';
import bcrypt from 'bcryptjs';
import { validateNewUser } from '../validations/users';
import User from '../models/user';
import { serverError } from '../utils/handlers';

const router = express.Router();

router.post('/', (req, res) => {
  const user = { ...req.body };
  validateNewUser(user).then(
    () => {
      const password = bcrypt.hashSync(req.body.password);
      new User({ ...req.body, password }).save().then(
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

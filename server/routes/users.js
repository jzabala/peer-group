import express from 'express';
import bcrypt from 'bcryptjs';
import { validateNewUser } from '../validations';
import User from '../models/user';

const router = express.Router();

router.post('/', (req, res) => {
  validateNewUser(req.body).then(
    () => {
      const password = bcrypt.hashSync(req.body.password);
      new User({ ...req.body, password }).save().then(
        () => res.end(),
        err => res.statue(500).json(err),
      );
    },
    (errors) => {
      res.status(400).json({ errors });
    },
  );
});

export default router;

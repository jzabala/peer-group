import express from 'express';
import validate from 'validate.js';
import bcrypt from 'bcryptjs';
import { newUser } from '../validations/user';
import User from '../models/user';

const router = express.Router();

router.post('/', (req, res) => {
  validate.async(req.body, newUser).then(
    () => {
      const password = bcrypt.hashSync(req.body.password);
      new User({ ...req.body, password }).save().then(
        () => res.json({ success: true }),
        err => res.statue(500).json(err),
      );
    },
    (errors) => {
      res.status(400).json({ errors });
    },
  );
});

export default router;

import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import config from '../config.json';
import { serverError } from '../utils/handlers';

const router = express.Router();

router.post('/', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).then(
    (user) => {
      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          const token = jwt.sign(
            { email: user.email },
            config.jwtSecret,
          );
          res.json({ token });
        } else {
          res.status(401).json({ errors: { general: 'Invalid Credentials' } });
        }
      } else {
        res.status(401).json({ errors: { general: 'Invalid Credentials' } });
      }
    },
    err => serverError(res, err),
  );
});

export default router;

import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import config from '../config.json';
import { serverError } from '../utils/handlers';
import { validateAuth } from '../validators/authValidator';

const router = express.Router();

router.post('/', (req, res) => {
  validateAuth(req.body).then(
    ({ email, password }) => {
      User.findOne({ email }).then(
        (user) => {
          if (user) {
            if (bcrypt.compareSync(password, user.password)) {
              const token = jwt.sign(
                { user: { email: user.email } },
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
    },
    errors => res.status(400).json({ errors }),
  );
});

export default router;

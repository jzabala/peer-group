import express from 'express';
import users from './users';
import auth from './authenticate';

const router = express.Router();

router.use('/users', users);
router.use('/authenticate', auth);

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to this API :)' });
});

export default router;

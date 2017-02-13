import express from 'express';
import users from './users';
import auth from './authenticate';
import paths from './paths';

const router = express.Router();

router.use('/users', users);
router.use('/authenticate', auth);
router.use('/paths', paths);

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to Learning Path API :)' });
});

export default router;

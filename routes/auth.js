import express from 'express';
import {
  register,
  login,
  logout,
  getCurrent,
  uploadAvatar,
} from '../controllers/auth.js';
import { authMiddleware } from '../middleware/auth.js';
import uploadMiddleware from '../middleware/upload.js';

import { authSchema } from '../schemas/users.js';
import validateBody from '../helpers/validateBody.js';

const router = express.Router();

router.post('/register', validateBody(authSchema), register);
router.post('/login', validateBody(authSchema), login);
router.post('/logout', authMiddleware, logout);
router.get('/current', authMiddleware, getCurrent);
router.patch(
  '/avatars',
  authMiddleware,
  uploadMiddleware.single('avatar'),
  uploadAvatar
);

export default router;

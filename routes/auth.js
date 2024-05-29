import express from 'express';
import { register, login, logout, getCurrent } from '../controllers/auth.js';
import { authMiddleware } from '../middleware/auth.js';
import { authSchema } from '../schemas/users.js';
import validateBody from '../helpers/validateBody.js';

const router = express.Router();

router.post('/register', validateBody(authSchema), register);
router.post('/login', validateBody(authSchema), login);
router.get('/logout', authMiddleware, logout);
router.get('/current', authMiddleware, getCurrent);

export default router;

import { Router } from 'express';
import authRouter from './auth.js';
import contactRouter from './contacts.js';

const router = Router();
router.use('/auth', authRouter);
router.use('/contacts', contactRouter);

export default router;

import { Router } from 'express';
import * as auth from '../controllers/user.controller';

const router = Router();

// router.post('/register-admin', auth.registerResAdmin);
router.post('/user-register', auth.registerUser);
router.post('/login', auth.signIn);

export default router;

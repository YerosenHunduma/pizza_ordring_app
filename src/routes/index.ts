import { Router } from 'express';
import authRoutes from './user.routes';
import globalErrorHandler from '../middlewares/globalErrorHandler';

const router = Router();

router.use('/auth', authRoutes);
router.use(globalErrorHandler);

export default router;

import { Router } from 'express';
import { handleRegister } from '../controller/auth.controller';
import { authenticate } from '../middlewares';

const authRouter = Router();

authRouter.post('/login', authenticate);
authRouter.post('/register', handleRegister);

export default authRouter;

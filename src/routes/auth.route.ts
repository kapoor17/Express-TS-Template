import { Router } from 'express';
import { handleLogin, handleRegister } from '../controller/auth.controller';
import { authenticate } from '../middlewares';

const authRouter = Router();

authRouter.post('/login', authenticate, handleLogin);
authRouter.post('/register', handleRegister);

export default authRouter;

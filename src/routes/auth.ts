import express from 'express';
import { hashPassword } from '../middleware/passwordHashing';
import { handleLogin, handleRegistration } from '../controllers/auth';
import authenticate from '../middleware/authenticate';
const authRouter = express.Router();

authRouter.post('/login', authenticate ,handleLogin);
authRouter.post('/register', handleRegistration);

export default authRouter;
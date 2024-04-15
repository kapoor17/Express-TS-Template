import express from 'express';
import { hashPassword } from '../middleware/passwordHashing';
import { handleLogin, handleRegistration } from '../controllers/auth';
const authRouter = express.Router();

authRouter.post('/login', handleLogin);
authRouter.post('/register', hashPassword, handleRegistration);

export default authRouter;
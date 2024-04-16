import express from 'express';
import {check} from 'express-validator';
import { handleLogin, handleRegistration } from '../controllers/auth';
import authenticate from '../middleware/authenticate';
const authRouter = express.Router();

authRouter.post('/login', [check('email').isEmail()] ,authenticate ,handleLogin);
authRouter.post('/register',[check('email').isEmail()], handleRegistration);

export default authRouter;
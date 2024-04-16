import express from 'express';
import {check} from 'express-validator';
import { handleLogin, handleRegistration } from '../controllers/auth';
import {authenticate, isUnauthenticated} from '../middleware/authenticate';
const authRouter = express.Router();

authRouter.post('/login', isUnauthenticated, [check('email').isEmail()], authenticate, handleLogin);
authRouter.post('/register', isUnauthenticated, [check('email').isEmail()], handleRegistration);

export default authRouter;
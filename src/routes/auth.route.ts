import { Router } from 'express';
import passport from 'passport';
import { handleLogin, handleRegister } from '../controller/auth.controller';

const authRouter = Router();

authRouter.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  handleLogin
);
authRouter.post('/register', handleRegister);

export default authRouter;

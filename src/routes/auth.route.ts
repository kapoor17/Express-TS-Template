import { Router } from 'express';
import { handleRegister, handleLogin } from '../controller/auth.controller';
import { authenticate, validateSchema } from '../middlewares';
import { ZodCustomerSchema } from '../models/Customer';

const authRouter = Router();

authRouter.post(
  '/login',
  validateSchema({ body: ZodCustomerSchema.omit({ name: true }) }),
  authenticate,
  handleLogin
);
authRouter.post(
  '/register',
  validateSchema({ body: ZodCustomerSchema }),
  handleRegister
);

export default authRouter;

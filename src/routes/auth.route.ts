import { Router } from 'express';
import { handleRegister } from '../controller/auth.controller';
import { authenticate, validateSchema } from '../middlewares';
import { ZodCustomerSchema } from '../models/Customer';

const authRouter = Router();

authRouter.post('/login', authenticate);
authRouter.post(
  '/register',
  validateSchema({ body: ZodCustomerSchema }),
  handleRegister
);

export default authRouter;

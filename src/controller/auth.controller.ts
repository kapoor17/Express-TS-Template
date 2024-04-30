import { HydratedDocument } from 'mongoose';

import { NextFunction, Request, Response } from 'express';
import { Customer } from '../models/Customer';
import AuthService from '../services/AuthService';

export const handleRegister = async (
  req: Request<{}, {}, Customer>,
  res: Response<HydratedDocument<Customer>>,
  next: NextFunction
) => {
  try {
    const customer = await AuthService.register(req.body);
    res.json(customer);
  } catch (err) {
    console.error(`Could not register a User`);
    next(err);
  }
};

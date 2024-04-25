import { Request, Response } from 'express';
import { InsertOneResult } from 'mongodb';

import { Customer, CustomerWithId } from '../models/Customer';
import AuthService from '../services/AuthService';

export const handleRegister = async (
  req: Request<{}, {}, Customer>,
  res: Response<InsertOneResult<CustomerWithId>>
) => {
  try {
    const customer = await AuthService.register(req.body);
    res.json(customer);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const handleLogin = async (
  req: Request<{}, {}, Pick<Customer, 'email' | 'password'>>,
  res: Response<CustomerWithId>
) => {
  const customer = await AuthService.login(req.body);
  res.json(customer);
};

import { Request, Response } from 'express';
import { CustomError } from '../errors';

export const errorHandler = (err: CustomError, req: Request, res: Response) => {
  const statusCode = err.status || 500;
  res.status(statusCode);
  res.json({
    error: err.message,
    stack: process.env.NODE_ENV === 'production' ? ':)' : err.stack
  });
};

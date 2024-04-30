import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors';
import config from '../config';

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  const { NODE_ENV } = config.server;
  const statusCode = err.status || 500;
  res.status(statusCode);
  res.json({
    error: err.message,
    stack: NODE_ENV === 'production' ? ':)' : err.stack
  });
};

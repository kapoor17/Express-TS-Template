import express, { Express } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { errorHandler } from '../middlewares/errorHandler';
import sessionsLoader from './sessions';
import passportLoader from './passport';

require('dotenv').config();
require('express-async-errors');

const expressLoader = async (app: Express) => {
  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(helmet());

  await sessionsLoader(app);
  passportLoader(app);
  app.use(errorHandler);
};

export default expressLoader;

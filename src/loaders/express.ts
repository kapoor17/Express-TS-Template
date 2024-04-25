import express, { Express } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { errorHandler } from '../middlewares/errorHandler';
import sessionsLoader from './sessions';
import passportLoader from './passport';
import databaseLoader from './database';
import routesLoader from './routes';

require('dotenv').config();
require('express-async-errors');

const expressLoader = async (app: Express) => {
  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(helmet());

  const { MONGO_URI = '' } = process.env;
  await databaseLoader(MONGO_URI);

  await sessionsLoader(app);
  passportLoader(app);

  routesLoader(app);

  app.use(errorHandler);
};

export default expressLoader;
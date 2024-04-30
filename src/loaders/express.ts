import express, { Express } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { errorHandler, notFound } from '../middlewares';
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
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());

  await databaseLoader();

  await sessionsLoader(app);
  passportLoader(app);

  routesLoader(app);

  app.use(notFound);
  app.use(errorHandler);
};

export default expressLoader;

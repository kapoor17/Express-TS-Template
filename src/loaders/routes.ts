import { Express } from 'express';
import authRouter from '../routes/auth.route';

const routesLoader = (app: Express) => {
  app.use('/auth', authRouter);
  app.get('/', (req, res) => res.send('Hello'));
};

export default routesLoader;

import express from 'express';
import expressLoader from './loaders/express';
import config from './config';

const app = express();

const { PORT } = config.server;

(async () => {
  try {
    await expressLoader(app);
    app.listen(PORT, () => console.log(`Server Listening at PORT: ${PORT}`));
  } catch (err) {
    console.error('Could not connect to the server');
  }
})();

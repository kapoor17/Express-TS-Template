import express from 'express';
import expressLoader from './loaders/express';

const app = express();

const { PORT } = process.env;

(async () => {
  try {
    await expressLoader(app);
    app.listen(PORT, () => console.log(`Server Listening at PORT: ${PORT}`));
  } catch (err) {
    console.error('Could not connect to the server');
  }
})();

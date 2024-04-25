import { Express } from 'express';
import MongoStore from 'connect-mongo';
import session, { SessionOptions } from 'express-session';

const sessionsLoader = async (app: Express) => {
  const { SESSION_SECRET = '', NODE_ENV, MONGO_URI } = process.env;

  let sessionStore;
  try {
    sessionStore = MongoStore.create({
      mongoUrl: MONGO_URI
    });
  } catch (err) {
    console.error('Could not connect to the Session Database');
    throw err;
  }

  const sessionObject: SessionOptions = {
    secret: SESSION_SECRET,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 4 // 4 hours
    },
    resave: false,
    saveUninitialized: false
  };

  if (NODE_ENV === 'production' && sessionObject.cookie) {
    app.set('trust proxy', 1);
    sessionObject.cookie.httpOnly = true;
    sessionObject.cookie.secure = true;
  }

  app.use(session(sessionObject));
};

export default sessionsLoader;

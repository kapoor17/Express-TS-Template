import { Express } from 'express';
import passport from 'passport';
import LocalStrategy, {
  VerifyFunction,
  IStrategyOptions
} from 'passport-local';
import { Customer } from '../models/Customer';

const passportLoader = (app: Express) => {
  const customFields: IStrategyOptions = {
    usernameField: 'email'
  };

  const verifyCallback: VerifyFunction = async (email, password, done) => {
    try {
      const user = await Customer.findOne({ email });
      if (!user) done(null, false);
      if (!user?.comparePassword(password)) {
        return done(null, false);
      }
      return done(null, user);
    } catch (e) {
      console.error(`Error while authenticating the Customer: ${e}`);
      return done(e);
    }
  };

  const localStrategy = new LocalStrategy.Strategy(
    customFields,
    verifyCallback
  );

  passport.use(localStrategy);

  passport.serializeUser(async (user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((userId, done) => {
    Customer.findById(userId)
      .then((user) => done(null, user))
      .catch((e) => done(e));
  });

  app.use(passport.initialize());
  app.use(passport.session());
};

export default passportLoader;

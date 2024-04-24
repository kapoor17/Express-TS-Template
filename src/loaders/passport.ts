import { Express } from 'express';
import passport from 'passport';
import LocalStrategy, {
  VerifyFunction,
  IStrategyOptions
} from 'passport-local';

const passportLoader = (app: Express) => {
  const customFields: IStrategyOptions = {
    usernameField: 'email'
  };

  const verifyCallback: VerifyFunction = (email, passport, done) => {
    try {
      /**
       * Find your user and return using done func
       */
    } catch (err) {
      console.error(`Passport could not verify the user: ${err}`);
      throw err;
    }
  };

  const localStrategy = new LocalStrategy.Strategy(
    customFields,
    verifyCallback
  );

  passport.use(localStrategy);

  passport.serializeUser((user, done) => done(user.id));
  passport.deserializeUser((userId, done) => {
    /**
     * Find the user using userID and return the User
     */
  });

  app.use(passport.initialize());
  app.use(passport.session());
};

export default passportLoader;

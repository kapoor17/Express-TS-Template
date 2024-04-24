import { Express } from 'express';
import passport from 'passport';
import LocalStrategy, {
  VerifyFunction,
  IStrategyOptions
} from 'passport-local';
import { ObjectId } from 'mongodb';
import { Customers } from '../models/Customer';

const passportLoader = (app: Express) => {
  const customFields: IStrategyOptions = {
    usernameField: 'email'
  };

  // eslint-disable-next-line consistent-return
  const verifyCallback: VerifyFunction = async (email, password, done) => {
    try {
      const customer = await Customers.findOne({ email });
      if (!customer) return done(null, false);
      if (customer.password !== password) return done(null, false);
      return done(null, customer);
    } catch (err) {
      console.error(`Passport could not verify the user: ${err}`);
      done(err);
    }
  };

  const localStrategy = new LocalStrategy.Strategy(
    customFields,
    verifyCallback
  );

  passport.use(localStrategy);

  passport.serializeUser((user, done) => done(user._id));
  passport.deserializeUser((userID: ObjectId, done) => {
    Customers.findOne({ _id: userID })
      .then((customer) => done(null, customer))
      .catch((err) => done(err));
  });

  app.use(passport.initialize());
  app.use(passport.session());
};

export default passportLoader;

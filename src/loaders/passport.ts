import {Express} from 'express';
import passport from 'passport'
import LocalStrategy, {VerifyFunction, IStrategyOptions} from 'passport-local';

interface UserNew {
    id: string
}
declare global {
    namespace Express {
      interface User extends UserNew {}
    }
}

const passportLoader = (app: Express) => {
    
    const customFields: IStrategyOptions = {
        usernameField: "email",
    }

    const verifyCallback: VerifyFunction = (email, password, done) => {
        /**
         * 
         * Find the user in DB and pass the user in 
         * done callback or else pass errors in it
         * example
         * User.findOne({ username: username }, function (err, user) {
         *   if (err) { return done(err); }
         *   if (!user) { return done(null, false); }
         *   if (!user.verifyPassword(password)) { return done(null, false); }
         *   return done(null, user);
         * });
         * 
         */
    }

    const localStrategy = new LocalStrategy.Strategy(customFields, verifyCallback);

    passport.use(localStrategy)

    passport.serializeUser((user, done) => {
        done(null, user.id)
    });

    passport.deserializeUser((userId, done) => {
        let user;
        // find user based on the user id and send it inside the done callback
        done(null, user)
    })

    app.use(passport.initialize());
    app.use(passport.session());
}

export default passportLoader;
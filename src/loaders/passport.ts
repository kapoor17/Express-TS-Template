import {Express} from 'express';
import passport from 'passport'
import LocalStrategy, {VerifyFunction, IStrategyOptions} from 'passport-local';
import User from '../models/User';

const passportLoader = (app: Express) => {
    
    const customFields: IStrategyOptions = {
        usernameField: "email",
    }

    const verifyCallback: VerifyFunction = async (email, password, done) => {
        try{
            const user = await User.findOne({email});
            if(!user) done(null, false)
            if(!user?.verifyPassword(password)){
                return done(null, false)
            }
            return done(null, user);
        }catch(e){
            console.error(`Error while authenticating the User: ${e}`);
            return done(e)
        }
    }

    const localStrategy = new LocalStrategy.Strategy(customFields, verifyCallback);

    passport.use(localStrategy)

    /**
     * grabs the user from the db and attaches 
     * the user id to the req.session.passport.user object
     */
    passport.serializeUser(async (user, done) => {
        done(null, user._id)
    });

    /**
     * based on the userId provided it finds the user
     * in the database and attached the user into 
     * req.user
     */
    passport.deserializeUser((userId, done) => {
        User.findById(userId)
            .then(user => done(null, user))
            .catch((e) => done(e));
    })

    app.use(passport.initialize());
    app.use(passport.session());
}

export default passportLoader;
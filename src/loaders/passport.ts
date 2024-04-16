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
            console.log(user, 'inside verify callback', typeof user)
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

    passport.serializeUser(async (user, done) => {
        //@ts-ignore
        done(null, user._id)
    });

    passport.deserializeUser((userId, done) => {
        console.log(`Deserializing User`)
        console.log({userId})
        User.findById(userId)
            .then(user => done(null, user))
            .catch((e) => done(e));
    })

    app.use(passport.initialize());
    app.use(passport.session());
}

export default passportLoader;
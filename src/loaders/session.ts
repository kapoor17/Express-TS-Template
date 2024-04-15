import {Express} from 'express';
import session, {SessionOptions} from "express-session";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
declare module "express-session" {
    interface SessionData {
        userId: string,
        isAuthenticated: boolean
    }
}

export const sessionLoader = (app: Express) => {
    /**
     * Configuring the MongoDB Database for 
     * storing the sessions
     */
    let sessionStore;
    try{
        sessionStore = MongoStore.create({
            mongoUrl: process.env.MONGO_SESSION_STORE_URI || ""
        })
    }catch(e){
        console.error(`Error while connecting to Mongo Session Store: ${e}`);
        throw e;
    }

    const sessionObject: SessionOptions = {
        secret: process.env.SESSION_SECRET || "",
        cookie: { maxAge: 1000*60*60*24 },
        resave: false,
        saveUninitialized: false,
        store: sessionStore
    }

    /**
     * secure needs an https connection, that is why 
     * it was giving new session tds with every request
     * when testing locally
     */
    if(app.get('env') == 'production' && sessionObject.cookie){
        app.set('trust proxy', 1);
        sessionObject.cookie.secure = true
    }
    
    app.use(session(sessionObject));
}
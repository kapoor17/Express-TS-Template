import {Express} from 'express';
import session, {SessionOptions} from "express-session";
declare module "express-session" {
    interface SessionData {
        userId: string,
        isAuthenticated: boolean
    }
}

export const sessionLoader = (app: Express) => {
    const sessionObject: SessionOptions = {
        secret: process.env.SESSION_SECRET || "",
        cookie: { maxAge: 1000*60*60*24 },
        resave: false,
        saveUninitialized: false,
        store: new session.MemoryStore()
    }
    // secure needs an https connection, that is why it was giving new session tds with every request
    if(app.get('env') == 'production' && sessionObject.cookie){
        app.set('trust proxy', 1);
        sessionObject.cookie.secure = true
    }
    app.use(session(sessionObject));
}
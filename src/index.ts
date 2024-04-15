require("express-async-errors");

import express from "express";
const app = express();

// middlewares
import 'dotenv/config';
import helmet from "helmet";
import bodyParser from "body-parser";
import errorHandler from "./middleware/errors";
import session from "express-session";

app.use(helmet());
app.use(bodyParser.json());
declare module "express-session" {
    interface SessionData {
        user?: {
            id: string,
            name: string
        },
        authenticated?: boolean
    }
}
app.use(session({
    secret: process.env.SESSION_SECRET || "",
    cookie: {
        maxAge: 1000*60*60*24,
        sameSite: "none",
        secure: true
    },
    resave: false,
    saveUninitialized: false,
    store: new session.MemoryStore()
}))

// routes
import authRouter from "./routes/auth";
app.use("/auth", authRouter)
app.use(errorHandler);

const PORT = process.env.PORT;
const startServer = () => {
    try{
        app.listen(PORT, () => console.log(`Server listening at PORT: ${PORT}`))
    }catch(error){
        console.error(`Error while starting the Server: ${error}`);
    }
}
startServer();
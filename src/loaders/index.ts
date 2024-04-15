import {  } from "express";
import { Express } from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import { sessionLoader } from "./session";
import { routesLoader } from "./routes";
import errorHandler from "../middleware/errors";
import morgan from 'morgan';

const appLoader = (app: Express) => {
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(morgan('dev'))
    
    sessionLoader(app);
    routesLoader(app);

    app.use(errorHandler);
}

export default appLoader;
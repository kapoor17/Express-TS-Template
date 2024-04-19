import { Express } from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import morgan from 'morgan';

import sessionLoader from "./session";
import routesLoader from "./routes";
import passportLoader from "./passport";

import { errorHandler } from "../middleware";

const appLoader = (app: Express) => {
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(morgan('dev'))
    
    sessionLoader(app);
    passportLoader(app);
    routesLoader(app);

    app.use(errorHandler);
}

export default appLoader;
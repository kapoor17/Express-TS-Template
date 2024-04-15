require("express-async-errors");

import express from "express";
const app = express();

// middlewares
import 'dotenv/config';
import helmet from "helmet";
import bodyParser from "body-parser";
import errorHandler from "./middleware/errors";
import { sessionLoader } from "./loaders/session";

app.use(helmet());
app.use(bodyParser.json());
sessionLoader(app);

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
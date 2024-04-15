import "express-async-errors";
import 'dotenv/config';

import express from "express";
import appLoader from "./loaders";
const app = express();

const PORT = process.env.PORT;
const startServer = () => {
    try{
        appLoader(app);
        app.listen(PORT, () => console.log(`Server listening at PORT: ${PORT}`))
    }catch(error){
        console.error(`Error while starting the Server: ${error}`);
    }
}
startServer();
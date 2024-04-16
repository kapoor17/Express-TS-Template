import "express-async-errors";
import 'dotenv/config';

import express from "express";
import appLoader from "./loaders";
import connectDB from "./models/connectDB";
const app = express();

const PORT = process.env.PORT;
const startServer = async () => {
    try{
        await connectDB(process.env.MONGO_URI || "")
        appLoader(app);
        app.listen(PORT, () => console.log(`Server listening at PORT: ${PORT}`))
    }catch(error){
        console.error(`Error while starting the Server: ${error}`);
    }
}
startServer();
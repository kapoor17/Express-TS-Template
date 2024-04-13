import express from "express";
import helmet from "helmet";
import router from "./routes";
import bodyParser from "body-parser";
const app = express();

// middlewares
app.use(helmet());
app.use(bodyParser.json());

// routes
app.use("/", router)

const PORT = process.env.PORT || 3000;
const startServer = () => {
    try{
        app.listen(PORT, () => console.log(`Server listening at PORT: ${PORT}`))
    }catch(error){
        console.error(`Error while starting the Server: ${error}`);
    }
}
startServer();
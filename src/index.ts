import express from "express";

const app = express();

const PORT = process.env.PORT;
const startServer = () => {
    try{
        app.listen(PORT, () => console.log(`Server listening at PORT: ${PORT}`))
    }catch(error){
        console.error(`Error while starting the Server: ${error}`);
    }
}
startServer();
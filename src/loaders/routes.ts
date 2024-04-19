import { Express } from "express"
import authRouter from "../routes/auth";
import router from "../routes";

export const routesLoader = (app: Express) => {
    app.use("/", router)
    app.use("/auth", authRouter)
}

export default routesLoader;
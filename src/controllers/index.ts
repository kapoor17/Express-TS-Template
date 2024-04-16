import { Request, Response, NextFunction } from "express";

export const handleGetRequest = (req: Request , res: Response, next: NextFunction) => {
    res.json(req.user);
}

type CustomRequest = Request<{world: string}, {}, {name: string, age: number, city: string}>
export const handlePostRequest = (req: CustomRequest , res: Response, next: NextFunction) => {
    console.log(req.user);
    console.log(`Hello ${req.params.world}`);
    res.json(req.body.name);
}

export const errorProneRequest = async (req: Request , res: Response, next: NextFunction) => {
    const throwAsyncError = async () => {
        return new Promise((res, rej) => {
          rej(new Error("Whoa"))
        })
    }
    await throwAsyncError()
}
import { Request, Response, NextFunction } from "express";

type CustomRequest = Request<{world: string}, {}, {name: string, age: number, city: string}>
export const handlePostRequest = (req: CustomRequest , res: Response, next: NextFunction) => {
    console.log(`Hello ${req.params.world}`);
    res.json(req.body.name);
}

const throwAsyncError = async () => {
    return new Promise((res, rej) => {
      rej("Whoa")
    })
}
export const errorProneRequest = async (req: Request , res: Response, next: NextFunction) => {
    await throwAsyncError();
}
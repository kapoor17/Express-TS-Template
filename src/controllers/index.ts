import { Request, Response, NextFunction } from "express";

export const handlePostRequest = 
(req: Request<{world: string}, {}, {name: string, age: number, city: string}>, res: Response, next: NextFunction) => {
    console.log(`Hello ${req.params.world}`);
    res.json(req.body.name);
}
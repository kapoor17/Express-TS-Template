import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt';
import { RegistrationRequest } from "../type/auth.interface";

export const hashPassword = async (req: RegistrationRequest, res: Response, next: NextFunction) => {
    const {password} = req.body;

    if(!!password){
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        req.body.password = hash;
    }

    next();
}
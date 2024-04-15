import { NextFunction, Request, Response } from "express";
import { LoginRequest, RegistrationRequest } from "../type/auth.interface";
import { BadRequestError } from "../errors";

export const handleLogin = async (req: LoginRequest, res: Response, next: NextFunction) => {
    const {email, password} = req.body;

    if(!email || !password){
        throw new BadRequestError("User details missing");
    }

    //connect to DB
}

export const handleRegistration = async (req: RegistrationRequest, res: Response, next: NextFunction) => {
    const {first_name, last_name, email, password} = req.body;

    if(!first_name || !last_name || !email || !password){
        throw new BadRequestError("User details missing");
    }

    //connect to DB
}
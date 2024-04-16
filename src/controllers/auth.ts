import { NextFunction, Response } from "express";
import { LoginRequest, RegistrationRequest } from "../types/auth.interface";
import { BadRequestError } from "../errors";
import User from "../models/User";
import StatusCodes from 'http-status-codes';

export const handleLogin = async (req: LoginRequest, res: Response, next: NextFunction) => {
    console.log(req);
    res.send({
        session: req.session,
        id: req.session.id,
        store: req.sessionStore
    })
}

export const handleRegistration = async (req: RegistrationRequest, res: Response, next: NextFunction) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        throw new BadRequestError("User details missing");
    }

    const user = await User.create({
        name, 
        email,
        password
    });

    res.status(StatusCodes.CREATED).json({
        user: {
            name: user.name
        }
    })
}
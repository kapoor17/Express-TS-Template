import { NextFunction, Request, Response } from "express";
import { LoginRequest, RegistrationRequest } from "../type/auth.interface";
import { BadRequestError } from "../errors";

export const handleLogin = async (req: LoginRequest, res: Response, next: NextFunction) => {
    const {email, password} = req.body;

    if(!email || !password){
        throw new BadRequestError("User details missing");
    }

    //connect to DB
    //check the user in DB
    //get the uuid for that user
    //and attach that uuid to the session object

    req.session.isAuthenticated = true;
    req.session.userId = 'acbd'

    res.send({
        session: req.session,
        id: req.session.id,
        store: req.sessionStore
    })
}

export const handleRegistration = async (req: RegistrationRequest, res: Response, next: NextFunction) => {
    const {first_name, last_name, email, password} = req.body;

    if(!first_name || !last_name || !email || !password){
        throw new BadRequestError("User details missing");
    }

    //connect to DB
    //create a new user
    //get the uuid for that user
    //and attach that uuid to the session object

    req.session.isAuthenticated = true;
    req.session.userId = 'acbd'

    res.send({
        session: req.sessionID,
        id: req.session.id,
        store: req.sessionStore
    })
}
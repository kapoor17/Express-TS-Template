import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UnauthenticatedError } from "../errors";

interface CustomJwtPayload extends JwtPayload {
    userId: string,
    userName: string
}
const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthenticatedError('Authentication Token Invalid');
    }
    
    const token = authHeader.split(' ')[0];
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET || "") as CustomJwtPayload;
        req.session.authenticated = true;
        req.session.user = {
            id: payload.userId,
            name: payload.userName
        };
        next();
    }catch(e){
        throw new UnauthenticatedError('Could not verify Token');
    }
}

export default authenticate
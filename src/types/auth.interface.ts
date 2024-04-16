import { Request } from "express";

export type RegistrationRequest = Request<{},{},{
    name: string,
    email: string, 
    password: string
}>

export type LoginRequest = Request<{},{},{
    email: string, 
    password: string
}> 
import { Request } from "express";

export type RegistrationRequest = Request<{},{},{
    first_name: string,
    last_name: string
    email: string, 
    password: string
}>

export type LoginRequest = Request<{},{},{
    email: string, 
    password: string
}> 
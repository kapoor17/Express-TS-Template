import { NextFunction, Request, Response } from "express";
import { UnauthenticatedError } from "../errors";
import passport from 'passport';

const authenticate = passport.authenticate('local', {
    failureRedirect: '/login',
    // successRedirect: '/'
})

export default authenticate
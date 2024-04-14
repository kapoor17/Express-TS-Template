import {StatusCodes} from "http-status-codes"
import CustomError from ".";

export class UnauthenticatedError extends CustomError {
    constructor(errorMessage: string){
        super(errorMessage, StatusCodes.UNAUTHORIZED);
    }
}
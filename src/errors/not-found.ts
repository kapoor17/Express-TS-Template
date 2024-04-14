import { StatusCodes } from "http-status-codes";
import CustomError from ".";

export class NotFoundError extends CustomError {
    constructor(errorMessage: string){
        super(errorMessage,StatusCodes.NOT_FOUND);
    }
}
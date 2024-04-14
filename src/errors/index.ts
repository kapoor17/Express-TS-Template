class CustomError extends Error {
    readonly status: number;

    constructor(errorMessage: string, status: number){
        super(errorMessage);
        this.status = status
    }
}

export * from './bad-request';
export * from './not-found';
export * from './unauthenticated';

export default CustomError;
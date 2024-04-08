import {NextFunction, Request, Response} from 'express';
import {StatusCodes} from "http-status-codes";
import {APIException} from "../errors/baseException";
import {NODE_ENV} from "../settings";

const exceptionHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (NODE_ENV === 'development') {
        console.error(`[Error] ${err}`);
    }

    if ("getCode" in err && err.getCode === "ER_DUP_ENTRY") {
        res.status(StatusCodes.CONFLICT).send({message: `Duplicated data already exists`});
    } else if (err.name === "TokenExpiredError") {
        res.status(StatusCodes.UNAUTHORIZED).send({message: 'Token expired'});
    } else if (err.name === "JsonWebTokenError") {
        res.status(StatusCodes.UNAUTHORIZED).send({message: 'Not valid token'});
    } else if (err.name === "NotBeforeError") {
        res.status(StatusCodes.UNAUTHORIZED).send({message: 'Token is not activated yet'});
    } else if (err instanceof APIException) {
        res.status(err.statusCode).json({message: err.message});
    } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message: 'Internal Server Error - Something went wrong!'});
    }

};

export default exceptionHandler;
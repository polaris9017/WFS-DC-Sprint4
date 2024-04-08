import {StatusCodes} from 'http-status-codes';

class BaseException extends Error {
    private _statusCode: StatusCodes;

    constructor(msg: string, statusCode: StatusCodes) {
        super(`${msg} [status: ${statusCode}]`);
        this.name = this.constructor.name;
        this._statusCode = statusCode;
    }


    get statusCode(): StatusCodes {
        return this._statusCode;
    }
}

export class DatabaseException extends BaseException {
    private readonly _code: string;

    constructor(msg: string, code?: string) {
        super(msg, StatusCodes.INTERNAL_SERVER_ERROR);
        code ? this._code = code : this._code = 'DB_ERROR';
    }

    get code(): string {
        return this._code;
    }
}

export class APIException extends BaseException {
    constructor(msg: string, statusCode: StatusCodes) {
        super(msg, statusCode);
    }
}
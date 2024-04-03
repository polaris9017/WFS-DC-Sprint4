import {StatusCodes} from 'http-status-codes';

class BaseException extends Error {
    constructor(msg: string, statusCode: StatusCodes) {
        super(`[Error] ${msg} [status: ${statusCode}]`);
        this.name = this.constructor.name;
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
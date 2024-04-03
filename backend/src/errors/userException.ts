import {StatusCodes} from "http-status-codes";
import {APIException} from "./baseException";

class NoteModificationBaseException extends APIException {
    constructor(msg?: string, statusCode?: StatusCodes) {
        super(msg ? msg : 'Failed to modify note.', statusCode ? statusCode : StatusCodes.FORBIDDEN);
    }
}

export class SignInFailedException extends APIException {
    constructor() {
        super('Invalid sign in credentials.', StatusCodes.UNAUTHORIZED);
    }
}

export class SignUpFailedException extends APIException {
    constructor() {
        super('Failed to create user.', StatusCodes.CONFLICT);
    }
}

export class UnauthorizedException extends APIException {
    constructor() {
        super('Unauthorized user.', StatusCodes.UNAUTHORIZED);
    }
}

export class InvalidTokenException extends APIException {
    constructor() {
        super('Invalid token.', StatusCodes.UNAUTHORIZED);
    }
}

export class NoteAccessForbiddenException extends APIException {
    constructor() {
        super('Invalid credential to access note.', StatusCodes.FORBIDDEN);
    }
}

export class NoteNotFoundException extends NoteModificationBaseException {
    constructor() {
        super('Note not found.', StatusCodes.NOT_FOUND);
    }
}

export class NoteCreationFailedException extends NoteModificationBaseException {
}

export class NoteUpdateFailedException extends NoteModificationBaseException {
}

export class NoteDeleteFailedException extends NoteModificationBaseException {
}

export class InvalidRequestException extends APIException {
    constructor() {
        super('Not a valid request.', StatusCodes.BAD_REQUEST);
    }
}

export class InternalServerException extends APIException {
    constructor() {
        super('Something went wrong!', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
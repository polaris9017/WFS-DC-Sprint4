import {NextFunction, Request, Response} from 'express';
import {Note} from "../controllers/notes";
import {NoteAccessForbiddenException} from "../errors/userException";
import {NoteModel} from "../models/notes";

declare module 'express-serve-static-core' {
    interface Request {
        note?: Note;
    }
}

export async function authorizeNote(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const userId = req.params.userId;

    const note = await NoteModel.getNote(parseInt(id));
    if (note.userId !== userId) throw new NoteAccessForbiddenException();

    req.note = note;
    next();
}
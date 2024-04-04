import {NextFunction, Request, Response} from 'express';
import {StatusCodes} from "http-status-codes";
import {NoteNotFoundException} from "../errors/userException";
import {NoteModel} from "../models/notes";

export interface Note {
    id: number;
    title: string;
    content: string;
    user_id: number;
    created_at: string;
    updated_at: string;
}

// API: GET /notes
export const getNoteList = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user!.id;
    const notes = await NoteModel.getNoteList(userId);
    return res.status(StatusCodes.OK).json(notes satisfies Note[]);
};

// API: GET /notes/:id
export const getNote = async (req: Request, res: Response, next: NextFunction) => {
    const noteId = parseInt(req.params.id);
    const note = await NoteModel.getNote(noteId);
    if (note) return res.status(StatusCodes.OK).json(note satisfies Note);
    throw new NoteNotFoundException();
};

// API: POST /notes
export const createNote = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user!.id;
    const {title, content} = req.body;
    const result = await NoteModel.createNote(userId, title, content);
    if (result) return res.status(StatusCodes.CREATED);
    throw new NoteNotFoundException();
};

// API: PUT /notes/:id
export const updateNote = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    const {title, content} = req.body;
    const result = await NoteModel.updateNote(id, title, content);
    if (result) return res.status(StatusCodes.OK);
    throw new NoteNotFoundException();
};

// API: DELETE /notes/:id
export const deleteNote = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    const result = await NoteModel.deleteNote(id);
    if (result) return res.status(StatusCodes.OK);
    throw new NoteNotFoundException();
};
import {NextFunction, Request, Response} from 'express';
import {StatusCodes} from "http-status-codes";
import {defaultConnection as connection} from "../utils/mysql";

// API: GET /notes
export const getNoteList = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user!.id;
    const [rows] = await connection.query('SELECT * FROM notes WHERE user_id = ?', [userId]);
    res.status(StatusCodes.OK).json(rows);
};

// API: GET /notes/:id
export const getNoteDetail = async (req: Request, res: Response, next: NextFunction) => {

};

// API: POST /notes
export const createNote = async (req: Request, res: Response, next: NextFunction) => {

};

// API: PUT /notes/:id
export const updateNote = async (req: Request, res: Response, next: NextFunction) => {

};

// API: DELETE /notes/:id
export const deleteNote = async (req: Request, res: Response, next: NextFunction) => {

};
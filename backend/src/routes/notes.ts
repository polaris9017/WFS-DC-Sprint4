import express, {NextFunction, Request, Response} from 'express';
import {getNoteList, getNote, createNote, updateNote, deleteNote} from '../controllers/notes';
import {authorizeNote} from "../middlewares/authorization";
import {authenticateUser} from "../middlewares/authentication";

const router = express.Router();

router.get('/', authenticateUser, authorizeNote, getNoteList);
router.get('/:id', authenticateUser, authorizeNote, getNote);
router.post('', authenticateUser, authorizeNote, createNote);
router.put('/:id', authenticateUser, authorizeNote, updateNote);
router.delete('/:id', authenticateUser, authorizeNote, deleteNote);

export default router;
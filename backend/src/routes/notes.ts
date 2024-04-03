import express, {NextFunction, Request, Response} from 'express';
import {getNoteList, getNoteDetail, createNote, updateNote, deleteNote} from '../controllers/notes';
const router = express.Router();

router.get('/', getNoteList);
router.get('/:id', getNoteDetail);
router.post('', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;
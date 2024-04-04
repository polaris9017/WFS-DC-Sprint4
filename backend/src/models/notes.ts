import {defaultConnection as connection} from "../utils/mysql";
import {Note} from "../controllers/notes";

export const getNoteList = async (userId: number) => {
    const [rows] = await connection.query('SELECT * FROM notes WHERE user_id = ?', [userId]);
    return rows as Note[];
};

// API: GET /notes/:id
export const getNote = async (noteId: number) => {
    const [rows] = await connection.query('SELECT * FROM notes WHERE id = ?', [noteId]);
    return rows ? rows[0] : null;
};
// API: POST /notes
export const createNote = async (userId: number, title: string, content: string) => {
    const result = await connection.queryReturnHeader('INSERT INTO notes (title, content, user_id) VALUES (?, ?, ?)', [title, content, userId]);
    return result.affectedRows === 1;
};

// API: PUT /notes/:id
export const updateNote = async (id: number, title: string, content: string) => {
    const result = await connection.queryReturnHeader('UPDATE notes SET title = ?, content = ? WHERE id = ?', [title, content, id]);
    return result.affectedRows === 1;
};

// API: DELETE /notes/:id
export const deleteNote = async (id: number) => {
    const result = await connection.queryReturnHeader('DELETE FROM notes WHERE id = ?', [id]);
    return result.affectedRows === 1;
};

export const NoteModel = {
    getNoteList,
    getNote,
    createNote,
    updateNote,
    deleteNote
};

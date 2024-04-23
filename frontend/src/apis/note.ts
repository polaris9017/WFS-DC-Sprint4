import {httpClient} from "@/utils/http";
import {NoteProps, NoteListProps, NoteListItemProps} from "@/props/NoteProps";

export const fetchNotes = async () => {
    const response = await httpClient.get<NoteListItemProps>("/notes");
    return {notes: response.data} satisfies NoteListProps;
};

export const fetchNote = async (id: number) => {
    const response = await httpClient.get<NoteProps>(`/notes/${id}`);
    return response.data;
};

export const createNote = async (noteData: Pick<NoteProps, "title" | "content">) => {
    const response = await httpClient.post<Pick<NoteProps, "id">>("/notes", noteData);
    return response.data;
};

export const updateNote = async (id: number, noteData: Pick<NoteProps, "title" | "content">) => {
    const response = await httpClient.put(`/notes/${id}`, noteData);
    return response.data;
};

export const deleteNote = async (id: number) => {
    const response = await httpClient.delete(`/notes/${id}`);
    return response.data;
};
export interface NoteProps {
    id: number;
    title: string;
    content: string;
    user_id: number;
    created_at: string;
    updated_at: string;
}

export type NoteListItemProps = Omit<NoteProps, 'content'>[];

export interface NoteListProps {
    notes: NoteListItemProps;
}
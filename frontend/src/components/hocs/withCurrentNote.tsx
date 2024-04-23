import {ComponentType} from 'react'
import {useParams} from "react-router-dom";
import {NoteProps} from "@/props/NoteProps";
import {useNote} from "@/hooks/useNote";

export interface CurrentNoteProps {
    currentNote: NoteProps;
}

const withCurrentNote = (Component: ComponentType<CurrentNoteProps>) => {
    return () => {
        const {id} = useParams();
        if (!id) return null;

        const {currentNote} = useNote(parseInt(id));
        if (!currentNote) return null;

        return <Component currentNote={currentNote}/>
    }
}

export default withCurrentNote;
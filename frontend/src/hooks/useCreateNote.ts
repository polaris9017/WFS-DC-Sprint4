import {createNote} from "@/apis/note";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {NoteProps} from "@/props/NoteProps";

export const useCreateNote = () => {
    const queryClient = useQueryClient();

    const createNoteMutate = useMutation({
        mutationFn: (noteData: Pick<NoteProps, 'title' | 'content'>) => createNote(noteData),
        onSuccess: async () => queryClient.invalidateQueries({queryKey: ['notes']})
    });

    return {createNote: createNoteMutate.mutateAsync};
}


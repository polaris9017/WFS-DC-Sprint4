import {useMutation, useQueryClient} from "@tanstack/react-query";
import {NoteProps} from "@/props/NoteProps";
import {updateNote} from "@/apis/note";

export const useUpdateNote = () => {
    const queryClient = useQueryClient();

    const updateNoteMutation = useMutation({
        mutationFn: ({id, ...data}: Pick<NoteProps, 'id' | 'title' | 'content'>) => updateNote(id, data),
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['notes']})
    });

    return {updateNote: updateNoteMutation.mutateAsync};
};
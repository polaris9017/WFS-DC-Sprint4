import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteNote} from "@/apis/note";

export const useDeleteNote = () => {
    const queryClient = useQueryClient();

    const deleteNoteMutation = useMutation({
        mutationFn: (id: number) => deleteNote(id),
        onSuccess: async () => queryClient.invalidateQueries({queryKey: ['notes']})
    });

    return {deleteNote: deleteNoteMutation.mutateAsync};
};
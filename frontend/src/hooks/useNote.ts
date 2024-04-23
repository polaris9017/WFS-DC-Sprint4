import {useQuery} from "@tanstack/react-query";
import {fetchNote} from "@/apis/note";

export const useNote = (id: number) => {
    const {data} = useQuery({
        queryKey: ['note', 'id'],
        queryFn: async () => await fetchNote(id)
    });
    return {currentNote: data};
}
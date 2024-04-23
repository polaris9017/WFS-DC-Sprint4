import {useQuery} from "@tanstack/react-query";
import {fetchNotes} from "@/apis/note";

export const useNotes = () => {
    const {data} = useQuery({
        queryKey: ['notes'],
        queryFn: fetchNotes
    });
    return data ? data : {notes: []};
}
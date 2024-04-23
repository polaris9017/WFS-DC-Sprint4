import {useMutation, useQueryClient} from "@tanstack/react-query";
import {requestLogout} from "@/apis/user";

export const useLogout = () => {
    const queryClient = useQueryClient();

    const logout = useMutation({
        mutationFn: requestLogout,
        onSuccess: () => queryClient.invalidateQueries({queryKey: ['currentUser']})
    });

    return {logout: logout.mutateAsync};
}
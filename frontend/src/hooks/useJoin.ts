import to from 'await-to-js'
import {isAxiosError} from "axios";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {requestJoin} from "@/apis/user";
import {LoginProps} from "@/props/UserProps";
import {StatusCodes} from "http-status-codes";

export const useJoin = () => {
    const queryClient = useQueryClient();

    const joinMutation = useMutation({
        mutationFn: async (userData: LoginProps) => {
            const [error] = await to(requestJoin(userData));
            if (isAxiosError(error) && error.response?.status === StatusCodes.CONFLICT) {
                return {
                    result: 'unauthorized' as const,
                    message: "이미 가입된 이메일입니다."
                };
            }

            if (error) throw error;

            await queryClient.invalidateQueries({queryKey: ['currentUser']});

            return {result: 'success' as const};
        },
    });

    return {join: joinMutation.mutateAsync};
};

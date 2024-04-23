import to from 'await-to-js'
import {isAxiosError} from "axios";
import {useMutation} from "@tanstack/react-query";
import {requestLogin} from "@/apis/user";
import {LoginProps} from "@/props/UserProps";
import {useAuthStore} from "@/store/authStore";
import {StatusCodes} from "http-status-codes";

const findCookie = (cookie: string[], key: string) => {
    return cookie.find(cookie => cookie.includes(key))?.match(new RegExp(`^${key}=(.+?);`))?.[1];
};

export const useLogin = () => {
    const {storeSignIn} = useAuthStore();
    const loginMutation = useMutation({
        mutationFn: async (params: LoginProps) => {
            const [error, data] = await to(requestLogin(params));
            if (isAxiosError(error) && error.response?.status === StatusCodes.UNAUTHORIZED) {
                return {result: 'unauthorized' as const};
            }
            if (error) throw error;

            const token = findCookie(data!, 'access-token');
            if (token) {
                storeSignIn(token);
                return {result: 'success' as const};
            } else return {result: 'unauthorized' as const};
        }
    });

    return {login: loginMutation.mutateAsync};
};
import {fetchCurrentUser} from "@/apis/user";
import {useQuery} from "@tanstack/react-query";
import to from "await-to-js";
import {isAxiosError} from "axios";
import {StatusCodes} from "http-status-codes";

export const useCurrentUser = () => {
    const {data} = useQuery({
        queryKey: ["currentUser"],
        queryFn: async () => {
            const [error, data] = await to(fetchCurrentUser());

            if (isAxiosError(error) && error.response?.status === StatusCodes.UNAUTHORIZED) {
                return 'unauthenticated' as const;
            }

            if (error) throw error;

            return data;
        }
    });

    return {currentUser: data};
};
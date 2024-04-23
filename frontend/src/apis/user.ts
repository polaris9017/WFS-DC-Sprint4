import {httpClient} from "@/utils/http";
import {UserProps, LoginProps} from "@/props/UserProps";

export const requestLogin = async (userData: LoginProps) => {
    const response = await httpClient.post("/login", userData);
    return response.headers["set-cookie"];
};

export const requestJoin = async (userData: LoginProps) => {
    const response = await httpClient.post("/users", userData);
    return response.data;
};

export const requestLogout = async () => {
    const response = await httpClient.post("/logout");
    return response.data;
};

export const fetchCurrentUser = async () => {
    const response = await httpClient.get<UserProps>("/users/me");
    return response.data satisfies UserProps;
};
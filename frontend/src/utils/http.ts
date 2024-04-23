import axios, {AxiosRequestConfig} from 'axios';
import {getToken, removeToken} from "@/store/authStore";

const BASE_URL = 'http://localhost:3031/api';
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
    const axiosInstance = axios.create({
        baseURL: BASE_URL,
        timeout: DEFAULT_TIMEOUT,
        headers: {
            'Content-Type': 'application/json',
            Authorization: getToken() ? getToken() : ""
        },
        withCredentials: true,
        ...config
    });

    axiosInstance.interceptors.request.use(
        (response) => {
            return response;
        },
        (error) => {
            if (error.response.status >= 500) {  // Internal server error
                window.location.href = "/error";
                return;
            }
            return Promise.reject(error);
        }
    );
    return axiosInstance;
}

export const httpClient = createClient();

type RequestMethods = 'get' | 'post' | 'put' | 'delete';

export const requestHandler = async <T>(request: RequestMethods, url: string, payload?: T) => {
    let response;

    switch (request) {
        case 'get':
            response = await httpClient.get(url);
            break;
        case 'post':
            response = await httpClient.post(url, payload);
            break;
        case 'put':
            response = await httpClient.put(url, payload);
            break;
        case 'delete':
            response = await httpClient.delete(url);
            break;
        default:
            throw new Error('Invalid request method');
    }

    return response.data;
};

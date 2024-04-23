/* zustand store 관리, 로그인 처리 */
import {create} from 'zustand';

interface StoreState {
    isSignedIn: boolean;
    storeSignIn: (token: string) => void;
    storeSignOut: () => void;
}

export const getToken = () => {
    return localStorage.getItem("token");
};

const setToken = (token: string) => {
    localStorage.setItem("token", token);
};

export const removeToken = () => {
    localStorage.removeItem("token");
};

export const useAuthStore = create<StoreState>((set) => ({  // set 인자를 통해 이후 상태 정보를 변경
    isSignedIn: !!getToken(),  // 초기 상태
    storeSignIn: (token) => {
        set({isSignedIn: true});
        setToken(token);
    },
    storeSignOut: () => {
        set({isSignedIn: false});
        removeToken();
    }
}));
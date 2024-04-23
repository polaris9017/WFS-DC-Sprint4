import {ComponentType} from 'react'
import {useNavigate} from "react-router-dom";
import {useCurrentUser} from "@/hooks/useCurrentUser";
import {UserProps} from "@/props/UserProps";

export interface AuthenticatedUserProps {
    currentUser: UserProps;
}

export const withAuthenticatedUser = (Component: ComponentType<AuthenticatedUserProps>) => {
    return () => {
        const {currentUser} = useCurrentUser();
        const navigate = useNavigate();

        if (!currentUser) return null;

        if (currentUser === 'unauthenticated') {
            navigate('/login');
            return null;
        }

        return <Component currentUser={currentUser}/>;
    };
};

export default withAuthenticatedUser;
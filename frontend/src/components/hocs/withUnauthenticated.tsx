import React, {ComponentType} from 'react'
import {useNavigate} from "react-router-dom";
import {useCurrentUser} from "@/hooks/useCurrentUser";

export const withUnauthenticated = (Component: ComponentType): React.FC => {
    return () => {
        const {currentUser} = useCurrentUser();
        const navigate = useNavigate();

        if (!currentUser) return null;

        if (currentUser !== 'unauthenticated') {
            navigate('/notes');
            return null;
        }

        return <Component/>;
    };
};

export default withUnauthenticated;
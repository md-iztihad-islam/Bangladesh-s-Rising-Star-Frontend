import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({children}) => {
    const {isAuthenticated} = useSelector(store => store.auth);

    if(!isAuthenticated){
        return <Navigate to='/signin' />
    }

    return children;
};

export const AuthenticatedUser = ({children}) => {
    const {isAuthenticated} = useSelector(store => store.auth);

    if(!isAuthenticated){
        return <Navigate to='/home' />
    }

    return children
};

export const AdminRoute = ({children}) => {
    const {user, isAuthenticated} = useSelector(store => store.auth);

    if(!isAuthenticated){
        return <Navigate to='/signin' />
    }

    if(!user || user.role !== 'admin'){
        return <Navigate to='/home' />
    }

    return children;
};

import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import useCreator from "../hooks/useCreator";


const CreatorRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isCreator, isCreatorLoading] = useCreator();
    const location = useLocation();

    if (loading || isCreatorLoading) {
        return <progress className="progress w-56"></progress>
    }

    if (user && isCreator) {
        return children;
    }

    
    return <Navigate to="/" state={{ from: location }} replace></Navigate>

};

export default CreatorRoute;
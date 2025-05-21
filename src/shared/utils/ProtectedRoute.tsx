import { Navigate } from "react-router-dom";
import { useAuth } from "../../features/auth/login/context/AuthContext.tsx";
import {Outlet} from "react-router";

const ProtectedRoute = ({
    redirectPath = "/login",
}) => {
    const { authenticated } = useAuth();

    return authenticated ? <Outlet/> : <Navigate to={redirectPath} replace />;
};

export default ProtectedRoute;

import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute () {
    const { loading, isAuthenticated } = useAuth();
    console.log(loading, isAuthenticated)

    if(loading) return console.log(loading)

    if (!loading && !isAuthenticated) return <Navigate to = '/login' replace/>
    
    return <Outlet/>
}

export default ProtectedRoute;
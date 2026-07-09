import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";

function ProtectedRoute() {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <Loading />
    if (!user) return <Navigate to='/login' replace />

    return (
        <>
            {user && <Outlet />}
        </>
    )
}

export default ProtectedRoute
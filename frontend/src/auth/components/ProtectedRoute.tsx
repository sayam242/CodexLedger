import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export function ProtectedRoute() {
    const { user, loading } = useAuthContext();

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="animate-pulse text-xl font-medium text-muted-foreground">
                    Checking Session...
                </div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export function PublicRoute() {
    const { user, loading, loginInProgress } = useAuthContext();

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="animate-pulse text-xl font-medium text-muted-foreground">
                    Checking Session...
                </div>
            </div>
        );
    }

    if (user && !loginInProgress) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
}

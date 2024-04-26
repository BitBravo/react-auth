import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { RoutePaths } from "../config/routes";

const ProtectedRoute = () => {
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return <>Loading...</>;
  }

  if (!isAuthenticated) {
    return <Navigate to={RoutePaths.Info} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

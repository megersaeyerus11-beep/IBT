import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function RequireAuth() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}

export default RequireAuth;
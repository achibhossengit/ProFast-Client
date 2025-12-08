import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../pages/Shared/LoadingSpinner";

const AdminRoute = ({ children }) => {
  const { user, authLoading } = useAuth();
  const userRole = user.role;

  if (authLoading) return <LoadingSpinner></LoadingSpinner>;

  if (!userRole || userRole !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;

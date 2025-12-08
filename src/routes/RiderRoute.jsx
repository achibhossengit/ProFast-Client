import { Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../pages/Shared/LoadingSpinner";

const RiderRoute = ({ children }) => {
  const { user, authLoading } = useAuth();
  const userRole = user?.role;

  if (authLoading) return <LoadingSpinner></LoadingSpinner>;

  if (!userRole || userRole !== "rider") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RiderRoute;

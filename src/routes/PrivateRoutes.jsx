import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../pages/Shared/LoadingSpinner";
import { Navigate, useLocation } from "react-router";

const PrivateRoutes = ({ children }) => {
  const { user, authLoading } = useAuth();
  const location = useLocation();
  if (authLoading) return <LoadingSpinner></LoadingSpinner>;
  if (!user)
    return <Navigate to={"/login"} state={location.pathname}></Navigate>;
  return children;
};

export default PrivateRoutes;

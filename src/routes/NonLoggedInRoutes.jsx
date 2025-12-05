import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../pages/Shared/LoadingSpinner";
import { Navigate } from "react-router";

const NonLoggedInRoutes = ({ children }) => {
  const { user, authLoading } = useAuth();

  if (authLoading) return <LoadingSpinner></LoadingSpinner>;

  if (user) return <Navigate to={"/"}></Navigate>;

  return children;
};

export default NonLoggedInRoutes;

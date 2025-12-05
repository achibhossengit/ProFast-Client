import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../pages/Shared/LoadingSpinner";

const AdminRoute = ({ children }) => {
  const { user, authLoading } = useAuth();
  const userRole = user.role;
  const { logoutUser } = useAuth();

  if (authLoading) return <LoadingSpinner></LoadingSpinner>;

  if (!userRole || userRole !== "admin") {
    return logoutUser();
  }

  return children;
};

export default AdminRoute;

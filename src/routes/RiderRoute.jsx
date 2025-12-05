import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../pages/Shared/LoadingSpinner";

const RiderRoute = ({ children }) => {
  const { user, authLoading } = useAuth();
  const userRole = user?.role;
  const { logoutUser } = useAuth();

  if (authLoading) return <LoadingSpinner></LoadingSpinner>;

  if (!userRole || userRole !== "rider") {
    return logoutUser();
  }

  return children;
};

export default RiderRoute;

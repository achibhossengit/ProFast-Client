import useUserRole from "../hooks/useUserRole";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../pages/Shared/LoadingSpinner";

const RiderRoute = ({ children }) => {
  const { userRole, roleLoading } = useUserRole();
  const { logoutUser } = useAuth();

  if (roleLoading) return <LoadingSpinner></LoadingSpinner>;

  if (!userRole || userRole !== "rider") {
    return logoutUser();
  }

  return children;
};

export default RiderRoute;

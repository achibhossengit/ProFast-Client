import LoadingSpinner from "../../Shared/LoadingSpinner";
import UserDashboard from "./UserDashboard";
import RiderDashboard from "./RiderDashboard";
import AdminDashboard from "./AdminDashboard";
import Forbidden from "../../Forbiden/Forbiden";
import useAuth from "../../../hooks/useAuth";

const DashboardHome = () => {
  const { user, authLoading } = useAuth();
  const userRole = user?.role;
  if (authLoading) return <LoadingSpinner></LoadingSpinner>;

  if (userRole === "user") return <UserDashboard></UserDashboard>;
  else if (userRole === "rider") return <RiderDashboard></RiderDashboard>;
  else if (userRole === "admin") return <AdminDashboard></AdminDashboard>;
  else return <Forbidden></Forbidden>;
};

export default DashboardHome;

import React from "react";
import useUserRole from "../../../hooks/useUserRole";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import UserDashboard from "./UserDashboard";
import RiderDashboard from "./RiderDashboard";
import AdminDashboard from "./AdminDashboard";
import Forbidden from "../../Forbiden/Forbiden";

const DashboardHome = () => {
  const { userRole, roleLoading } = useUserRole();
  if (roleLoading) return <LoadingSpinner></LoadingSpinner>;

  if (userRole === "user") return <UserDashboard></UserDashboard>;
  else if (userRole === "rider") return <RiderDashboard></RiderDashboard>;
  else if (userRole === "admin") return <AdminDashboard></AdminDashboard>;
  else return <Forbidden></Forbidden>;
};

export default DashboardHome;

import { NavLink } from "react-router";
import useUserRole from "../../../hooks/useUserRole";

const DashboardNavitems = () => {
  const { userRole, roleLoading } = useUserRole();
  return (
    <>
      <li>
        <NavLink to={"/dashboard/my-parcels"}>My Parcels</NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard/payment-history"}>Payment History</NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard/send-parcel"}>Send Parcel</NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard/profile"}>My Profile</NavLink>
      </li>
      {!roleLoading && userRole === "admin" && (
        <>
          <li>
            <NavLink to={"/dashboard/rider-applications"}>Applications</NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/riders"}>Riders</NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/assign-rider"}>Assign Rider</NavLink>
          </li>
        </>
      )}
    </>
  );
};

export default DashboardNavitems;

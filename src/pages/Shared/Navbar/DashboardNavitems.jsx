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

      {/* rider links */}
      {!roleLoading && userRole === "rider" && (
        <>
          <li>
            <NavLink to={"/dashboard/pendingDeliveries"}>
              Pending Delivery
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/completedDeliveries"}>Completed</NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/myEarnings"}>Earnings</NavLink>
          </li>
        </>
      )}

      {/* admin links */}
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

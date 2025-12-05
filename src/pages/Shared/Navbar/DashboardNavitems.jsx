import { NavLink } from "react-router";
import {
  FaBox,
  FaCreditCard,
  FaPaperPlane,
  FaUser,
  FaTruck,
  FaCheckCircle,
  FaDollarSign,
  FaClipboardList,
  FaUsers,
  FaUserPlus,
  FaClipboardCheck,
  FaWarehouse,
  FaHistory,
  FaSignOutAlt,
} from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

const DashboardNavitems = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const userRole = user?.role;
  return (
    <>
      {/* rider links */}
      {userRole === "rider" && (
        <>
          <li>
            <NavLink to={"/dashboard/pendingDeliveries"}>
              <FaTruck /> Pending Delivery
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/completedDeliveries"}>
              <FaCheckCircle /> Completed
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/myDeliveries"}>
              <FaClipboardCheck /> My Deliveries
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/myEarnings"}>
              <FaDollarSign /> Earnings
            </NavLink>
          </li>
        </>
      )}

      {/* admin links */}
      {userRole === "admin" && (
        <>
          <li>
            <NavLink to={"/dashboard/assign-rider"}>
              <FaUserPlus /> Assign Rider
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/wire-house"}>
              <FaWarehouse /> Wire House
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/parcel-history"}>
              <FaHistory /> Parcel History
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/rider-applications"}>
              <FaClipboardList /> Applications
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/riders"}>
              <FaUsers /> Riders
            </NavLink>
          </li>
        </>
      )}

      {/* user links */}
      {userRole === "user" && (
        <>
          <li>
            <NavLink to={"/dashboard/my-parcels"}>
              <FaBox /> My Parcels
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/payment-history"}>
              <FaCreditCard /> Payment History
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/send-parcel"}>
              <FaPaperPlane /> Send Parcel
            </NavLink>
          </li>
        </>
      )}

      <li>
        <NavLink to={"/dashboard/profile"}>
          <FaUser /> My Profile
        </NavLink>
      </li>
      <li>
        <butotn onClick={logoutUser}>
          <FaSignOutAlt /> Log out
        </butotn>
      </li>
    </>
  );
};

export default DashboardNavitems;

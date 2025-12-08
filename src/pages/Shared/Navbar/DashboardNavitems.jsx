import { NavLink } from "react-router";
import {
  FaBox,
  FaCreditCard,
  FaPaperPlane,
  FaUser,
  FaTruck,
  FaDollarSign,
  FaClipboardList,
  FaUsers,
  FaWarehouse,
  FaSignOutAlt,
} from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

const DashboardNavitems = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const userRole = user?.role;
  return (
    <>
      <li>
        <NavLink to={"/dashboard/send-parcel"}>
          <FaPaperPlane /> Send Parcel
        </NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard/parcels/all/all"}>
          <FaTruck /> Manage Parcels
        </NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard/payment-history"}>
          <FaCreditCard /> Payment History
        </NavLink>
      </li>

      {/* rider links */}
      {userRole === "rider" && (
        <>
          <li>
            <NavLink to={"/dashboard/my-earnings"}>
              <FaDollarSign /> Earnings
            </NavLink>
          </li>
        </>
      )}

      {/* admin links */}
      {userRole === "admin" && (
        <>
          <li>
            <NavLink to={"/dashboard/wire-house"}>
              <FaWarehouse /> Wire Houses
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/rider-applications"}>
              <FaClipboardList /> Applications
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/users/all/all"}>
              <FaUsers />
              Manage Users
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

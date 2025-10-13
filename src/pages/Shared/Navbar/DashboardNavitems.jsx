import { NavLink } from "react-router";

const DashboardNavitems = () => {
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
        <NavLink to={"/dashboard/rider-applications"}>Applications</NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard/profile"}>My Profile</NavLink>
      </li>
    </>
  );
};

export default DashboardNavitems;

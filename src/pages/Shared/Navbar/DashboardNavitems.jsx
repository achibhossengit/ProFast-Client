import { NavLink } from "react-router";

const DashboardNavitems = () => {
  return (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard"}>My Parcels</NavLink>
      </li>
      <li>
        <NavLink to={"/profile"}>Profile</NavLink>
      </li>
    </>
  );
};

export default DashboardNavitems;

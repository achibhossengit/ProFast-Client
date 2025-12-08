import { NavLink } from "react-router";

const NavItems = () => {
  return (
    <>
      <li>
        <NavLink to={"/services"}>Services</NavLink>
      </li>
      <li>
        <NavLink to={"/pricing"}>Pricing</NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard/send-parcel"}>Send A Parcel</NavLink>
      </li>
      <li>
        <NavLink to={"/be-rider"}>Be a Rider</NavLink>
      </li>
      <li>
        <NavLink to={"/about"}>About Us</NavLink>
      </li>
    </>
  );
};

export default NavItems;

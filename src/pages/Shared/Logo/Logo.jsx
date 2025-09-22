import { Link } from "react-router";
import logoPng from "../../../assets/logo.png";

const Logo = () => {
  return (
    <Link className="flex items-end">
      <img src={logoPng} alt="" />
      <p className="text-3xl font-extrabold -ml-4">ProFast</p>
    </Link>
  );
};

export default Logo;

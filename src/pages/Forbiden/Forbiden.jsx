import { Link } from "react-router";
import { FaLock } from "react-icons/fa";

const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-base-200 text-center px-4">
      <FaLock className="text-6xl text-error mb-4" />
      <h1 className="text-5xl font-bold text-error">403</h1>
      <h2 className="text-2xl font-semibold mt-2">Access Denied</h2>
      <p className="text-base mt-2 max-w-md">
        You don’t have permission to view this page. If you believe this is a
        mistake, please contact the administrator.
      </p>
      <Link to="/" className="btn btn-outline btn-primary mt-6">
        ← Go back to Home
      </Link>
    </div>
  );
};

export default Forbidden;

import { Link } from "react-router-dom";
import { useAuth } from "../../services/auth/IsLoggedIn";
import LoadingPage from "../common/LoadingPage";

function RestrictTo({ children, roles }) {
  const { user, loading } = useAuth();
  const hasAuthority = roles.includes(user?.role);
  // Returns
  if (loading) return <LoadingPage />;
  if (!hasAuthority) {
    return (
      <div className="font-mainFont text-mainGreen text-xl text-center  mt-10">
        You do not have the authority to access this URL !
        <p>
          <Link to="/" className="hover:underline text-sm">
            Go to Home Page !
          </Link>
        </p>
      </div>
    );
  }
  if (hasAuthority) return <>{children}</>;
}

export default RestrictTo;

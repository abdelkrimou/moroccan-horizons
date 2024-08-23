import { Link } from "react-router-dom";
import { useAuth } from "../../services/auth/IsLoggedIn";
import LoadingPage from "../common/LoadingPage";

function Protect({ children }) {
  const { isAuthenticated, loading } = useAuth();
  console.log(isAuthenticated);
  // returns
  if (loading) return <LoadingPage />;
  if (!isAuthenticated) {
    return (
      <div className="font-mainFont text-mainGreen text-xl text-center  mt-10">
        You are not logged in !
        <p>
          <Link to="/login" className="hover:underline text-sm">
            Go to login Page !
          </Link>
        </p>
      </div>
    );
  }
  return <>{children}</>;
}

export default Protect;

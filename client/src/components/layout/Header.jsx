import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../ui/Logo";
import Container from "./Container";
import HeadingHome from "../common/HeadingHome";
import PrimaryBtn from "../ui/PrimaryBtn";
import SecondaryBtn from "../ui/SecondaryBtn";
import { useAuth } from "../../services/auth/IsLoggedIn";
import { useEffect, useState } from "react";
import { PiSignOutLight } from "react-icons/pi";
import { logout } from "../../services/auth/AuthLogout";
import toast from "react-hot-toast";
import LoadingSpinner from "../common/LoadingSpinner";

function Header() {
  const [isLogoutLoad, setIsLogoutLoad] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, user } = useAuth();
  useEffect(() => {}, [user]);

  async function handleLogout() {
    try {
      setIsLogoutLoad(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await logout();
      location.pathname === "/" ? window.location.reload(true) : navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLogoutLoad(false);
    }
  }
  return (
    <header className="bg-accentGreen/10 border-b-mainGreen border-[0.5px]">
      <Container>
        <div className="md:flex-row py-4 grid-cols-3 flex flex-col justify-center items-center gap-4">
          <HeadingHome />

          <Logo />

          {user ? (
            <nav className="flex gap-4">
              <Link to={user?.role === "user" ? "user" : "admin"}>
                <div className="hover:scale-[1.01] group flex gap-3 font-mainFont font-light items-center transition-all duration-100 ease-in-out">
                  <img
                    className="w-[40px] group-hover:scale-[1.025] border-accentGreen transition-all duration-100 ease-in-out border-[1px] h-[40px] rounded-full object-cover"
                    src={`/user-images/${user?.photo}`}
                    alt="user-profile"
                  />
                  <h2 className="capitalize text-dm text-mainGreen">
                    {loading ? <LoadingSpinner /> : user.name.split(" ")[0]}
                  </h2>
                </div>
              </Link>
              <hr className="border-mainGreen border-[0.25px] h-[20px] m-auto" />
              <button
                onClick={handleLogout}
                className="hover:scale-[1.025] flex items-center gap-2 transition-all duration-100 ease-in-out font-mainFont text-sm p-2 border-[0.5px] hover:bg-accentYellow border-mainGreen rounded-full px-4"
              >
                <PiSignOutLight className="inline text-lg" />
                {isLogoutLoad ? (
                  <span className="flex gap-4 items-center">
                    Logout <LoadingSpinner />
                  </span>
                ) : (
                  "Log out"
                )}
              </button>
            </nav>
          ) : (
            <nav className="flex px-4 md:justify-end justify-center items-center gap-3">
              {loading ? (
                <LoadingSpinner />
              ) : (
                <>
                  <Link to="/login">
                    <SecondaryBtn>Login</SecondaryBtn>
                  </Link>
                  <Link to="/signup">
                    <PrimaryBtn>Sign up</PrimaryBtn>
                  </Link>
                </>
              )}
            </nav>
          )}
        </div>
      </Container>
    </header>
  );
}

export default Header;

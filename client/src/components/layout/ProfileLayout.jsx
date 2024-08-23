import { Link, Outlet, useLocation } from "react-router-dom";
import Container from "../layout/Container";
import { MdOutlineSettings } from "react-icons/md";
import { GoCodeReview } from "react-icons/go";
import { MdTour } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { MdOutlinePaid } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa6";
import { FaUsersCog } from "react-icons/fa";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../services/auth/IsLoggedIn";
const userSettings = [
  { setting: "settings", link: "/user", icon: <MdOutlineSettings /> },
  { setting: "bookings ", link: "/user/bookings", icon: <FaRegBookmark /> },
  { setting: "reviews ", link: "/user/reviews", icon: <GoCodeReview /> },
  { setting: "billing ", link: "/user/billing", icon: <MdOutlinePaid /> },
];
const adminSettings = [
  {
    setting: "Manage tours ",
    link: "/admin/manage-tours",
    icon: <MdTour />,
  },
  {
    setting: "Manage users ",
    link: "/admin/manage-users",
    icon: <FaUsersCog />,
  },
  {
    setting: "Manage bookings ",
    link: "/admin/manage-bookings",
    icon: <FaRegBookmark />,
  },
  {
    setting: "Manage reviews ",
    link: "/admin/manage-reviews",
    icon: <GoCodeReview />,
  },
];

function ProfileLayout() {
  const { user } = useAuth();
  const location = useLocation();
  const pathName = location.pathname;
  const [isDashOpen, setIsDashOpen] = useState(false);
  const dashboardRef = useRef();

  const handleClickOutside = (event) => {
    if (dashboardRef.current && !dashboardRef.current.contains(event.target)) {
      setIsDashOpen(false);
    }
  };
  useEffect(() => {
    setIsDashOpen(false);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [location]);
  return (
    <Container>
      <div className="md:m-8 my-8 flex bg-accentYellow/10 rounded-md shadow-lg md:flex-row flex-col flex-nowrap">
        <aside
          ref={dashboardRef}
          className={`aside-left  md:overflow-hidden bg-accentYellow/50  border-r-[0.5px] border-mainGreen/50 text-mainGreen text-md ${
            isDashOpen ? "md:max-w-[300px]" : "md:max-w-[70px]"
          } transition-all duration-200 ease-in-out`}
        >
          {user?.role?.toLowerCase() !== "admin" ? (
            <div
              id="user-settings"
              className="font-textFont  w-full md:py-8  md:min-w-[250px] font-normal"
            >
              <ul className="user md:m-0 m-auto flex w-fit md:flex-col justify-start items-start overflow-visible flex-row gap-3">
                <li
                  className={`${
                    isDashOpen ? "rotate-0" : "rotate-180"
                  } hidden  md:block relative transition-all ease-in-out duration-300 cursor-pointer px-5 text-2xl py-3 hover:scale-[1.4] ml-[2px] `}
                >
                  <MdOutlineKeyboardDoubleArrowLeft
                    onClick={() => setIsDashOpen((s) => !s)}
                  />{" "}
                </li>
                {userSettings.map((set, i) => (
                  <Link key={i} to={set.link}>
                    <li
                      className={`group ${
                        pathName === set.link
                          ? "md:border-l-mainGreen/80 md:border-t-transparent border-t-mainGreen/80"
                          : ""
                      }  flex uppercase transition-all  duration-300 ease-in-out md:hover:pl-6 border-transparent border-[3px] cursor-pointer px-5 py-3 md:hover:border-l-mainGreen/80 md:hover:border-t-transparent  hover:border-t-mainGreen/80 justify-start items-center gap-6 `}
                    >
                      <span className="font-[100] hover:scale-[1.1]  transition-all relative  ease-in-out text-[23px]">
                        <span
                          className={`transition-all duration-500 ease-in-out  overflow-hidden absolute md:hidden group-hover:max-w-[1200px] max-w-0 group-hover:p-1 text-[12px] translate-y-0 font-medium bg-mainYellow/40  z-50 translate-x-[50%] right-[50%] group-hover:translate-y-[32px]`}
                        >
                          {set.setting}
                        </span>
                        <span>{set.icon}</span>
                      </span>
                      <span className="hidden md:block">{set.setting}</span>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          ) : (
            <>
              <hr />
              <div id="admin-settings font-textFont">
                <ul className="user md:py-8 md:m-0 m-auto flex w-fit md:flex-col md:justify-start md:items-start items-center  overflow-visible flex-row gap-3">
                  <Link to="/admin">
                    <li
                      className={`${
                        pathName === "/admin"
                          ? "md:border-l-mainGreen/80 md:border-t-transparent border-t-mainGreen/80"
                          : ""
                      }  relative  transition-all ease-in-out duration-300 border-[3px]  px-4 md:text-[30px] text-2xl py-3 border-transparent hover:scale-[1.1] `}
                    >
                      <RiAdminFill className="mt-[-3px] md:m-0" />
                      <span className=" absolute text-[12px] block  mt-[-10px] font-textFont font-light md:ml-0 ml-[-4px]">
                        admin
                      </span>
                    </li>
                  </Link>
                  {adminSettings.map((set, i) => (
                    <Link key={i} to={set.link}>
                      <li
                        className={`group ${
                          pathName === set.link
                            ? "md:border-l-mainGreen/80 md:border-t-transparent border-t-mainGreen/80"
                            : ""
                        }  flex uppercase transition-all  duration-300 ease-in-out md:hover:pl-6 border-transparent border-[3px] cursor-pointer px-5 py-3 md:hover:border-l-mainGreen/80 md:hover:border-t-transparent  hover:border-t-mainGreen/80 justify-start items-center gap-6 `}
                      >
                        <span className="font-[100] hover:scale-[1.1]  transition-all relative  ease-in-out text-[23px]">
                          <span
                            className={`duration-500 text-center ease-in-out overflow-hidden absolute md:hidden group-hover:max-w-[1200px] max-w-0 group-hover:p-1 text-[12px] translate-y-0 font-medium bg-mainYellow/40  z-50 translate-x-[50%] right-[50%] group-hover:translate-y-[32px]`}
                          >
                            {set.setting}
                          </span>
                          <span>{set.icon}</span>
                        </span>
                        <span className=" hidden md:block  min-w-[200px] ">
                          {set.setting}
                        </span>
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            </>
          )}
        </aside>
        <aside className="flex-1 overflow-auto p-5 ">
          <Outlet />
        </aside>
      </div>
    </Container>
  );
}

export default ProfileLayout;

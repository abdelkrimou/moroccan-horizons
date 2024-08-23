import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { MdEditDocument } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

import { useState } from "react";
import { useDeleteUser } from "../../hooks/useDeleteUser";
import { useUpdateUser } from "../../hooks/useUpdateUser";
function ManageUsersTableRow({ isLast, user }) {
  const [showConfirmDel, setShowConfirmDel] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [userRole, setUserRole] = useState(user?.role);
  const [updateUser, isUpdating] = useUpdateUser();
  // const [showUpdate, setShowUpdate] = useState(false);
  const userId = user._id;

  const [deleteUser, isDeleting] = useDeleteUser();
  async function handleDeletUser() {
    deleteUser(userId);
  }
  // function that handles update
  function handleUpdateRole() {
    const updatedData = { role: userRole };
    updateUser({ userId, updatedData });
    setShowUpdate(false);
  }
  return (
    <>
      <li
        className={`p-3 ${
          isLast ? "" : "border-b-[0.25px]"
        } border-r-[0.25px] w-full  capitalize border-mainGreen`}
      >
        {user?.name}
      </li>
      <li
        className={`p-3 ${
          isLast ? "" : "border-b-[0.25px]"
        } border-r-[0.25px]  border-mainGreen`}
      >
        {user?.email}
      </li>
      <li
        className={`p-3 ${
          isLast ? "" : "border-b-[0.25px]"
        } border-r-[0.25px]  border-mainGreen`}
      >
        {showUpdate ? (
          <select
            onChange={(e) => setUserRole(e.target.value)}
            value={userRole}
            className="bg-accentYellow/50 focus:ring-[1px] focus:outline-none ring-accentGreen capitalize border-mainGreen border-[0.25px] rounded-lg p-2"
          >
            <option value="all-roles">All roles </option>
            <option value="user">user</option>
            <option value="admin">admin</option>
            <option value="guide">guide</option>
            <option value="lead-guide">lead-guide</option>
          </select>
        ) : (
          user?.role
        )}
      </li>
      <li
        className={`p-3 ${
          isLast ? "" : "border-b-[0.25px]"
        } border-r-[0.25px]  border-mainGreen`}
      >
        <Link to={"/admin/manage-bookings"} className="hover:underline">
          Click here
        </Link>
      </li>
      <li
        className={`p-3 ${
          isLast ? "" : "border-b-[0.25px]"
        } border-r-[0.25px]  border-mainGreen`}
      >
        <Link to={"/admin/manage-reviews"} className="hover:underline">
          Click here
        </Link>
      </li>
      <li
        className={`p-3 flex flex-wrap gap-4 ${
          isLast ? "" : "border-b-[0.25px]"
        }  capitalize border-mainGreen `}
      >
        {!showUpdate ? (
          <div
            disabled={isUpdating}
            onClick={() => setShowUpdate(true)}
            className="bg-green-400 relative  px-2 h-[40px] rounded-lg text-white cursor-pointer text-sm hover:bg-green-500 group"
          >
            <MdEditDocument className="text-lg mt-[10px]" />
            <span className="absolute hidden text-white bg-mainGreen p-1 rounded-md translate-x-[-50%] translate-y-[-110%] top-0 text-sm group-hover:block left-1/2">
              Update
            </span>
          </div>
        ) : (
          <>
            <button
              disabled={isDeleting}
              className="bg-green-400  relative transition-all duration-400 ease-in-out px-3 h-[40px] rounded-lg text-white cursor-pointer text-[13px] hover:bg-green-500 "
              // className=" mt-[10px] text-[10px] uppercase"
              onClick={handleUpdateRole}
            >
              Save
            </button>
            <button
              onClick={() => setShowUpdate(false)}
              className="bg-mainGreen uppercase relative transition-all duration-400 ease-in-out px-2 h-[40px] rounded-lg text-white cursor-pointer text-[18px] hover:bg-green-500 "
            >
              <RxCross2 />
            </button>
          </>
        )}

        {!showConfirmDel ? (
          <div
            onClick={() => setShowConfirmDel(true)}
            className="bg-red-400 relative text-white h-[40px] cursor-pointer hover:bg-red-500 px-2 text-sm rounded-lg group transition-all duration-200 ease-in-out"
          >
            <MdDelete className="text-lg mt-[10px]" />{" "}
          </div>
        ) : (
          <button
            disabled={isDeleting}
            className="bg-red-400 relative uppercase text-white h-[40px] cursor-pointer hover:bg-red-500 px-2 text-[10px] rounded-lg group transition-all duration-200 ease-in-out"
            onMouseLeave={() => setShowConfirmDel(false)}
            onClick={handleDeletUser}
          >
            delete
          </button>
        )}
        <span
          className={`absolute hidden text-white bg-red-700 p-1 rounded-md translate-x-[-50%] translate-y-[-110%] top-0 text-sm group-hover:${
            !showConfirmDel && "block"
          } left-1/2`}
        >
          Delete
        </span>
      </li>
    </>
  );
}

export default ManageUsersTableRow;

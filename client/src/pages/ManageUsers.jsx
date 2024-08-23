import { useQuery } from "@tanstack/react-query";
import Pagination from "../components/common/Pagination";
import ManageUsersTable from "../components/layout/ManageUsersTable";
import { IoSearch } from "react-icons/io5";
import { getUsers } from "../services/user/getUsers";
import { useEffect } from "react";
import { useState } from "react";
import LoadingPage from "../components/common/LoadingPage";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorPage from "../components/ui/ErrorPage";

function ManageUsers() {
  const itemsPerPage = 10;

  const [users, setUsers] = useState([]);
  // filtering /searching states
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all-roles");
  // Paination
  const navigate = useNavigate();
  const location = useLocation();
  // Get queries
  const queryParams = new URLSearchParams(location.search);
  // Get current page or set it to 1 if no page quer exist
  const currentPage = queryParams.get("page") || "1";
  // set the start and end indexes
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // fetch users
  const { isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // Filtering
  function handleFiltering(e) {
    navigate(`${location.pathname}?${"page=1"}`);

    setSearchQuery("");
    let filterValue = e.target.value;
    if (filterValue === "all-roles") return setUsers(data);
    setUsers(() => data.filter((user) => user.role === filterValue));
  }
  // Search input
  function handleSearch(e) {
    navigate(`${location.pathname}?${"page=1"}`);

    setFilterRole("all-roles");
    let searchInput = e.target.value;
    if (searchInput.trim() === "") return setUsers(data);
    setUsers(() =>
      data.filter((user) =>
        user.name.toLowerCase().includes(searchInput.trim().toLowerCase())
      )
    );
  }
  useEffect(() => {
    setUsers(data);
  }, [data]);
  if (isLoading) return <LoadingPage />;
  if (error) return <ErrorPage />;
  return (
    <div className="m-auto min-h-[600px] max-w-[900px]">
      <div className="flex gap-4 flex-wrap items-center border-[0.25px] rounded-lg p-2">
        <h2 className="underline">Filtering:</h2>
        <select
          onChange={(e) => {
            handleFiltering(e);
            setFilterRole(e.target.value);
          }}
          value={filterRole}
          className="bg-accentYellow/50 focus:ring-[1px] focus:outline-none ring-accentGreen capitalize border-mainGreen border-[0.25px] rounded-lg p-2"
        >
          <option value="all-roles">All roles </option>
          <option value="user">user</option>
          <option value="admin">admin</option>
          <option value="guide">guide</option>
          <option value="lead-guide">lead-guide</option>
        </select>
        <span>/</span>
        <div className=" flex-1 min-w-[250px] w-full relative ml-auto">
          <label
            htmlFor="user-name"
            className="cursor-pointer absolute right-2 translate-y-[50%] top-0 text-xl"
          >
            <IoSearch />
          </label>
          <input
            value={searchQuery}
            onChange={(e) => {
              handleSearch(e);
              setSearchQuery(e.target.value);
            }}
            id="user-name"
            type="text"
            placeholder="Enter the Username"
            className="p-2 w-full bg-accentGreen/20 rounded-lg focus:outline-none focus:ring-[1px] pl-4 ring-mainGreen placeholder:text-mainGreen text-mainGreen"
          />
        </div>
      </div>

      {users?.length === 0 ? (
        <div className="text-center text-lg font-textFont text-mainGreen mt-8">
          Oops ! There is no matched users{" "}
        </div>
      ) : (
        <>
          <ManageUsersTable
            users={users}
            startIndex={startIndex}
            endIndex={endIndex}
          />
          <Pagination data={data} />
        </>
      )}
    </div>
  );
}

export default ManageUsers;

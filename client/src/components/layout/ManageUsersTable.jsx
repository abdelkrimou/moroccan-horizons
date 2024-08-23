import ManageUsersTableRow from "../common/ManageUsersTableRow";

function ManageUsersTable({ users, startIndex, endIndex }) {
  return (
    <ul className="border-[0.5px] overflow-auto mt-4 divide-mainGreen grid grid-cols-manageUsersTable gap-x-[1px]  border-mainGreen text-mainGreen rounded-lg">
      <li className="p-2 bg-accentYellow border-b-[0.25px] font-medium border-r-[0.25px] border-mainGreen">
        Username
      </li>
      <li className="p-2 bg-accentYellow border-b-[0.25px] font-medium  border-r-[0.25px]">
        Email
      </li>
      <li className="p-2 bg-accentYellow border-b-[0.25px] font-medium  border-r-[0.25px]">
        Role
      </li>
      <li className="p-2 bg-accentYellow border-b-[0.25px] font-medium  border-r-[0.25px] ">
        Bookings
      </li>
      <li className="p-2 bg-accentYellow border-b-[0.25px] font-medium  border-r-[0.25px] ">
        Reviews
      </li>
      <li className="p-2 bg-accentYellow border-b-[0.25px] font-medium  ">
        Edit
      </li>
      {users?.slice(startIndex, endIndex)?.map((user, i) => (
        <ManageUsersTableRow
          user={user}
          key={i}
          isLast={i === users.length - 1}
        />
      ))}
    </ul>
  );
}

export default ManageUsersTable;

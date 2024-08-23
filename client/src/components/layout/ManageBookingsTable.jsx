import ManageBookingsTableRow from "../common/ManageBookingsTableRow";

function ManageBookingsTable({ bookings }) {
  return (
    <ul className="border-[0.5px] overflow-auto mt-4 divide-mainGreen grid grid-cols-manageBookingsTable gap-x-[1px]  border-mainGreen text-mainGreen rounded-lg">
      <li className="p-2 bg-accentYellow border-b-[0.25px] font-medium border-r-[0.25px] border-mainGreen">
        Booking Id
      </li>
      <li className="p-2 bg-accentYellow border-b-[0.25px] font-medium  border-r-[0.25px]">
        User
      </li>
      <li className="p-2 bg-accentYellow border-b-[0.25px] font-medium  border-r-[0.25px]">
        Tour
      </li>
      <li className="p-2 bg-accentYellow border-b-[0.25px] font-medium  border-r-[0.25px] ">
        n.People
      </li>
      <li className="p-2 bg-accentYellow border-b-[0.25px] font-medium  border-r-[0.25px] ">
        Departure Date
      </li>
      <li className="p-2 bg-accentYellow border-b-[0.25px] font-medium  ">
        Status
      </li>
      {bookings?.map((booking, i) => (
        <ManageBookingsTableRow
          booking={booking}
          key={i}
          isLast={i === bookings.length - 1}
        />
      ))}
    </ul>
  );
}

export default ManageBookingsTable;

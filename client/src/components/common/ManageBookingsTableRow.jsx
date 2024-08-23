function ManageBookingsTableRow({ booking, isLast }) {
  return (
    <>
      <li
        className={`p-3 ${
          isLast ? "" : "border-b-[0.25px]"
        } border-r-[0.25px] w-full  capitalize border-mainGreen`}
      >
        {booking?._id}
      </li>
      <li
        className={`p-3 ${
          isLast ? "" : "border-b-[0.25px]"
        } border-r-[0.25px]  border-mainGreen`}
      >
        {booking?.user?.name || "Unkown"}
      </li>
      <li
        className={`p-3 ${
          isLast ? "" : "border-b-[0.25px]"
        } border-r-[0.25px]  border-mainGreen`}
      >
        {booking?.tour?.name}
      </li>
      <li
        className={`p-3 ${
          isLast ? "" : "border-b-[0.25px]"
        } border-r-[0.25px]  border-mainGreen`}
      >
        {booking?.nPeople}
      </li>
      <li
        className={`p-3 ${
          isLast ? "" : "border-b-[0.25px]"
        } border-r-[0.25px]  border-mainGreen`}
      >
        {new Date(booking?.tour?.startDates[0]).toDateString()}
      </li>

      <li
        className={`p-3 capitalize ${isLast ? "" : "border-b-[0.25px]"}  ${
          booking.paid ? "text-accentGreen" : "text-red-500"
        } border-mainGreen`}
      >
        {booking?.paid ? " booked " : "in process"}
      </li>
    </>
  );
}

export default ManageBookingsTableRow;

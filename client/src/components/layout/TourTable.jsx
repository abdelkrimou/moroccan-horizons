import React from "react";
import TourTableRow from "../common/TourTableRow";

function TourTable({ bookings }) {
  return (
    <ul className="border-[0.5px] overflow-hidden mt-4 divide-mainGreen grid grid-cols-bookingTable gap-x-[1px]  border-mainGreen text-mainGreen rounded-lg">
      <li className="p-2 bg-accentYellow border-b-[0.25px] font-medium border-r-[0.25px] border-mainGreen">
        Tours
      </li>
      <li className="p-2 bg-accentYellow border-b-[0.25px] font-medium  border-r-[0.25px]">
        People
      </li>
      <li className="p-2 bg-accentYellow border-b-[0.25px] font-medium  border-r-[0.25px]">
        Dep.Date
      </li>
      <li className="p-2 bg-accentYellow border-b-[0.25px] font-medium  ">
        Status
      </li>
      {bookings?.map((booking, i) => (
        <TourTableRow
          booking={booking}
          key={i}
          isLast={i === bookings.length - 1}
        />
      ))}
    </ul>
  );
}

export default TourTable;

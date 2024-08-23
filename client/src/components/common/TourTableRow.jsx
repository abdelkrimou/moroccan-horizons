import { Link } from "react-router-dom";

function TourTableRow({ booking, isLast }) {
  return (
    <>
      <li
        className={`p-3 ${
          isLast ? "" : "border-b-[0.25px]"
        } border-r-[0.25px] w-full hover:underline hover:bg-mainGreen/10 capitalize border-mainGreen`}
      >
        <Link to={`/${booking?.tour?.name.toLowerCase().split(" ").join("-")}`}>
          <span className="w-full h-full block">{booking?.tour?.name}</span>
        </Link>
      </li>
      <li
        className={`p-3 ${
          isLast ? "" : "border-b-[0.25px]"
        } border-r-[0.25px] capitalize border-mainGreen`}
      >
        {booking?.nPeople}
      </li>
      <li
        className={`p-3 ${
          isLast ? "" : "border-b-[0.25px]"
        } border-r-[0.25px] capitalize border-mainGreen`}
      >
        {" "}
        {new Date(booking?.tour?.startDates[0]).toDateString()}
      </li>
      <li
        className={`p-3 ${
          isLast ? "" : "border-b-[0.25px]"
        }  capitalize border-mainGreen ${
          booking.paid ? "text-accentGreen" : "text-red-500"
        }  `}
      >
        {booking.paid ? "Booked" : "In proccess"}
      </li>
    </>
  );
}

export default TourTableRow;

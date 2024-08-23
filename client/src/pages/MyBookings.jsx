import { useQuery } from "@tanstack/react-query";
import TourTable from "../components/layout/TourTable";
import { getMyBookings } from "../services/booking/getMyBookings";
import LoadingPage from "../components/common/LoadingPage";
import { useEffect, useState } from "react";
import ErrorPage from "../components/ui/ErrorPage";
// const bookings = [
//   {
//     tour: "the expedition parker",
//     people: 1,
//     departureDate: "jun-10-2024",
//     status: "booked",
//   },
//   {
//     tour: "The Sea Explorer",
//     people: 2,
//     departureDate: "sep-2-2024",
//     status: "booked",
//   },
//   {
//     tour: "The City Wanderer",
//     people: 1,
//     departureDate: "jun-25-2024",
//     status: "booked",
//   },
//   {
//     tour: "The Sports Lover",
//     people: 2,
//     departureDate: "aug-2-2024",
//     status: "in proccess",
//   },
//   {
//     tour: "The Star Gazer",
//     people: 1,
//     departureDate: "oct-19-2024",
//     status: "booked",
//   },
//   {
//     tour: "The Forest Hiker",
//     people: 3,
//     departureDate: "oct-2-2024",
//     status: "in process",
//   },
//   {
//     tour: "The Snow Adventurer",
//     people: 1,
//     departureDate: "jun-2-2024",
//     status: "booked",
//   },
// ];

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const { isLoading, error, data } = useQuery({
    queryKey: ["myBooking"],
    queryFn: getMyBookings,
  });
  useEffect(() => {
    setBookings(data);
  }, [data]);
  if (isLoading) return <LoadingPage />;
  if (error) return <ErrorPage />;
  console.log(bookings);
  return (
    <div className="m-auto min-h-[600px] max-w-[700px]">
      {bookings?.length !== 0 ? (
        <TourTable bookings={bookings} />
      ) : (
        <div className="text-xl font-textFont mt-20 text-mainGreen text-center ">
          Oops ! You haven't Booked any tours yet!
        </div>
      )}
    </div>
  );
}

export default MyBookings;

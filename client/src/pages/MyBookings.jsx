import { useQuery } from "@tanstack/react-query";
import TourTable from "../components/layout/TourTable";
import { getMyBookings } from "../services/booking/getMyBookings";
import LoadingPage from "../components/common/LoadingPage";
import ErrorPage from "../components/ui/ErrorPage";

function MyBookings() {
  const {
    isLoading,
    error,
    data: bookings,
  } = useQuery({
    queryKey: ["myBooking"],
    queryFn: getMyBookings,
  });

  if (isLoading) return <LoadingPage />;
  if (error) return <ErrorPage />;
  console.log(bookings);
  return (
    <div className="m-auto min-h-[600px] max-w-[700px]">
      {bookings?.length !== 0 ? (
        <TourTable bookings={bookings} />
      ) : (
        <div className="text-xl font-textFont mt-20 text-mainGreen text-center ">
          Oops ! You have not Booked any tours yet!
        </div>
      )}
    </div>
  );
}

export default MyBookings;

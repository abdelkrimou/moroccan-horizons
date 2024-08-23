import { useQuery } from "@tanstack/react-query";
import Pagination from "../components/common/Pagination";
import ManageBookingsTable from "../components/layout/ManageBookingsTable";
import { getAllBookings } from "../services/booking/getAllBookings";
import LoadingPage from "../components/common/LoadingPage";
import { fetchTours } from "../services/tours/FetchTours";
import { useState } from "react";
import { useEffect } from "react";
import ErrorPage from "../components/ui/ErrorPage";

function ManageBookings() {
  const [bookings, setBookings] = useState([]);
  const [sortType, setSortType] = useState("latest");
  // Fetch Bookings
  const { isLoading, error, data } = useQuery({
    queryKey: ["Booking"],
    queryFn: getAllBookings,
  });
  // Fetch Tours for filtering
  const { data: tours } = useQuery({
    queryKey: ["tours"],
    queryFn: fetchTours,
  });

  // Sorting
  function handleSorting(e) {
    if (e.target.value === "oldest") {
      setBookings(
        bookings.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateA - dateB;
        })
      );
    } else if (e.target.value === "latest") {
      setBookings(
        bookings.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA;
        })
      );
    }
  }
  // Filtering
  function handleFiltering(e) {
    let filterValue = e.target.value;
    if (filterValue === "all-tours") return setBookings(data);
    setBookings(() =>
      data.filter((booking) => booking.tour.name === filterValue)
    );
  }

  // setBookings
  useEffect(() => {
    setBookings(data);
  }, [data]);
  if (isLoading) return <LoadingPage />;
  if (error) return <ErrorPage />;
  return (
    <div className="overflow-auto m-auto min-h-[600px] max-w-[700px]">
      <div className="flex gap-3 flex-wrap items-center border-[0.25px] rounded-lg p-2">
        <h2 className="underline">Filtering:</h2>
        <select
          onChange={(e) => handleFiltering(e)}
          defaultValue="By Tour name"
          className="bg-accentYellow/50 focus:ring-[1px] focus:outline-none ring-accentGreen capitalize border-mainGreen border-[0.25px] rounded-lg p-2"
        >
          <option value="all-tours">All tours</option>
          {tours?.map((tour, i) => (
            <option key={i} value={tour?.name}>
              {tour?.name}
            </option>
          ))}
        </select>
        <h2 className="underline">Sorting:</h2>

        <select
          onChange={(e) => {
            handleSorting(e);
            setSortType(e.target.value);
          }}
          value={sortType}
          className="bg-accentYellow/50 focus:ring-[1px] focus:outline-none ring-accentGreen capitalize border-mainGreen border-[0.25px] rounded-lg p-2"
        >
          <option value="latest">Latest</option>
          <option value="oldest">oldest</option>
        </select>
      </div>
      {bookings?.length === 0 ? (
        <div className="text-lg text-center mt-10 text-mainGreen font-textFont">
          Opps !! There is no matched Bookings
        </div>
      ) : (
        <>
          <ManageBookingsTable bookings={bookings} />
          <Pagination data={data} />
        </>
      )}
    </div>
  );
}

export default ManageBookings;

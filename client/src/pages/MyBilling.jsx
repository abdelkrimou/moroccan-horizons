import { useQuery } from "@tanstack/react-query";
import BillingTable from "../components/layout/BillingTable";
import { getMyBookings } from "../services/booking/getMyBookings";
import { useEffect, useState } from "react";
import LoadingPage from "../components/common/LoadingPage";
import ErrorPage from "../components/ui/ErrorPage";

// const billings = [
//   {
//     tour: "the expedition parker",
//     people: 1,
//     purchaseDate: "jun-10-2024",
//     totalPrice: 78,
//   },
//   {
//     tour: "The Sea Explorer",
//     people: 2,
//     purchaseDate: "sep-2-2024",
//     totalPrice: 120,
//   },
//   {
//     tour: "The City Wanderer",
//     people: 1,
//     purchaseDate: "jun-25-2024",
//     totalPrice: 200,
//   },
//   {
//     tour: "The Sports Lover",
//     people: 2,
//     purchaseDate: "aug-2-2024",
//     totalPrice: 150,
//   },
//   {
//     tour: "The Star Gazer",
//     people: 1,
//     purchaseDate: "oct-19-2024",
//     totalPrice: 99,
//   },
//   {
//     tour: "The Forest Hiker",
//     people: 3,
//     purchaseDate: "oct-2-2024",
//     totalPrice: 260,
//   },
//   {
//     tour: "The Snow Adventurer",
//     people: 1,
//     purchaseDate: "jun-2-2024",
//     totalPrice: 300,
//   },
// ];
function MyBilling() {
  const [billings, setBillings] = useState();
  const { isLoading, error, data } = useQuery({
    queryKey: ["myBooking"],
    queryFn: getMyBookings,
  });
  useEffect(() => {
    setBillings(data);
  }, [data]);
  console.log(billings);
  if (isLoading) return <LoadingPage />;
  if (error) return <ErrorPage />;
  return (
    <div className="m-auto min-h-[600px] max-w-[700px]">
      {billings?.length ? (
        <BillingTable billings={billings} />
      ) : (
        <div className="text-xl font-textFont mt-20 text-mainGreen text-center ">
          Oops ! You do not have any billings yet
        </div>
      )}
    </div>
  );
}

export default MyBilling;

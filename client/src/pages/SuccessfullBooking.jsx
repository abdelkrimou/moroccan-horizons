import { Link } from "react-router-dom";

function SuccessfullBooking() {
  return (
    <main className="text-center mt-8 text-mainGreen font-mainFont">
      <h1 className="text-2xl font-semibold ">Payment Successful!</h1>
      <p className="text-accentGreen text-lg">
        Thank you for your purchase! Your booking has been confirmed.
      </p>
      <Link to="user/bookings" className="animate-pulse hover:animate-none ">
        Go to My Bookings
      </Link>
    </main>
  );
}

export default SuccessfullBooking;

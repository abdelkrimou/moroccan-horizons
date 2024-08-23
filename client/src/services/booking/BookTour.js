import axios from "axios";
import toast from "react-hot-toast";
const stripe = window.Stripe(
  "pk_test_51Pps7LEBIPLoKYpvX5phBrQftzPDoNtrk8Y2AwsRo4wbfmw6rUD4Js6h6V86ocgBzR6aKXmVY7AXwDCiJr1a8a3e00HLxhKOnv"
);
export const bookTour = async (tourId, quantity) => {
  try {
    // 1) Get checkout session from API
    const session = await axios({
      method: "GET",
      url: `http://127.0.0.1:8000/api/v1/bookings/checkout-session/${tourId}/${quantity}`,
      withCredentials: true, // Ensure cookies are sent and received
    });
    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    toast.error(err.message);
  }
};

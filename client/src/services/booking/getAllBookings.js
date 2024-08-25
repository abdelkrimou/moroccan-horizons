import axios from "axios";

export async function getAllBookings() {
  const response = await axios({
    method: "GET",
    url: `${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/bookings`,
    withCredentials: true, // Ensure cookies are sent and received
  });
  return response.data.data.doc;
}

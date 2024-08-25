import axios from "axios";

export async function getMyBookings() {
  const response = await axios({
    method: "GET",
    url: `${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/bookings/me`,
    withCredentials: true, // Ensure cookies are sent and received
  });
  return response.data.data;
}

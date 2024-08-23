import axios from "axios";

export async function getMyBookings() {
  const response = await axios({
    method: "GET",
    url: `http://127.0.0.1:8000/api/v1/bookings/me`,
    withCredentials: true, // Ensure cookies are sent and received
  });
  return response.data.data;
}

import axios from "axios";

export async function deleteTourById(tourId) {
  await axios({
    method: "DELETE",
    url: `${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/tours/${tourId}`,
    withCredentials: true,
  });
}

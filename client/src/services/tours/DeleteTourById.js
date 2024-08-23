import axios from "axios";

export async function deleteTourById(tourId) {
  await axios({
    method: "DELETE",
    url: `http://127.0.0.1:8000/api/v1/tours/${tourId}`,
    withCredentials: true,
  });
}

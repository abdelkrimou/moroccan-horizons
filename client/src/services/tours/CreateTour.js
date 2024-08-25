import axios from "axios";

export async function createTour(data) {
  await axios({
    method: "POST",
    url: `${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/tours`,
    data,
  });
}

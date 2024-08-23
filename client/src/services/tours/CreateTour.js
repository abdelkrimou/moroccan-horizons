import axios from "axios";

export async function createTour(data) {
  await axios({
    method: "POST",
    url: `http://127.0.0.1:8000/api/v1/tours`,
    data,
  });
}

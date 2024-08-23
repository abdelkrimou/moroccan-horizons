import axios from "axios";

export async function fetchTours() {
  const tours = await axios({
    method: "GET",
    url: "http://127.0.0.1:8000/api/v1/tours",
  });
  if (!tours.status === 200) {
    throw new Error("There is a problem with Uploading tours!");
  }
  return tours.data.data.doc;
}

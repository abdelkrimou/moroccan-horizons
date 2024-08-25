import axios from "axios";

export async function fetchTours() {
  const tours = await axios({
    method: "GET",
    url: `${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/tours`,
  });
  if (!tours.status === 200) {
    throw new Error("There is a problem with Uploading tours!");
  }
  return tours.data.data.doc;
}

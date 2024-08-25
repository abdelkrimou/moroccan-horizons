import axios from "axios";

export async function fetchTour(nameSlug) {
  const response = await axios({
    method: "GET",
    url: `${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/tours`,
  });
  if (!response.status === 200) {
    throw new Error("There is a problem with Uploading the tour!");
  }
  const tours = response.data.data.doc;
  const tourId = tours.filter((tour) => tour.nameSlug === nameSlug)[0]._id;

  const tour = await axios({
    method: "GET",
    url: `${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/tours/${tourId}`,
  });
  if (!tour.status === 200) {
    throw new Error("There is a problem with Uploading the tour!");
  }
  return tour.data.data.doc;
}

import axios from "axios";

export async function updateTour({ tourId, updatedData }) {
  const tours = await axios({
    method: "PATCH",
    url: `${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/tours/${tourId}`,
    data: updatedData,
  });

  return tours.data.data.doc;
}

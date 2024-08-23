import axios from "axios";

export async function updateTour({ tourId, updatedData }) {
  const tours = await axios({
    method: "PATCH",
    url: `http://127.0.0.1:8000/api/v1/tours/${tourId}`,
    data: updatedData,
  });

  return tours.data.data.doc;
}

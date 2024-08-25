import axios from "axios";

export async function addReview({ tourId, data }) {
  await axios({
    method: "POST",
    url: `${
      import.meta.env.VITE_BACKEND_BASEURL
    }/api/v1/tours/${tourId}/reviews`,
    data: {
      review: data.review,
      rating: data.rating,
    },
    withCredentials: true, // Ensure cookies are sent and received
  });
}

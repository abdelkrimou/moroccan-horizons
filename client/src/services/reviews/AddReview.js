import axios from "axios";

export async function addReview({ tourId, data }) {
  await axios({
    method: "POST",
    url: `http://127.0.0.1:8000/api/v1/tours/${tourId}/reviews`,
    data: {
      review: data.review,
      rating: data.rating,
    },
    withCredentials: true, // Ensure cookies are sent and received
  });
}

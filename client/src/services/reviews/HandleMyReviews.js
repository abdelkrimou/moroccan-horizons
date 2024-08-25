import axios from "axios";

export async function getMyReviews({ userId }) {
  const response = await axios({
    method: "GET",
    url: `${
      import.meta.env.VITE_BACKEND_BASEURL
    }/api/v1/reviews/user/${userId}`,
    withCredentials: true, // Ensure cookies are sent and received
  });
  return response.data.data.userReviews;
}

export async function deleteMyReview(reviewId) {
  await axios({
    method: "DELETE",
    url: `${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/reviews/${reviewId}`,
    withCredentials: true, // Ensure cookies are sent and received
  });
  return;
}
export async function updateMyReview({ reviewId, updatedData }) {
  await axios({
    method: "PATCH",
    url: `${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/reviews/${reviewId}`,
    data: updatedData,
    withCredentials: true, // Ensure cookies are sent and received
  });
  return;
}

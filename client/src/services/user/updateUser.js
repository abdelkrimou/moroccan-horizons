import axios from "axios";

export async function updateUser({ userId, updatedData }) {
  await axios({
    method: "PATCH",
    url: `${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/users/${userId}`,
    data: updatedData,
    withCredentials: true, // Ensure cookies are sent and received
  });
}

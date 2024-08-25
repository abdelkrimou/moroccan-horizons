import axios from "axios";

export async function deleteUser(userId) {
  await axios({
    method: "DELETE",
    url: `${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/users/${userId}`,
    withCredentials: true, // Ensure cookies are sent and received
  });
}

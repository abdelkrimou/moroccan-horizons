import axios from "axios";

export async function deleteUser(userId) {
  await axios({
    method: "DELETE",
    url: `http://127.0.0.1:8000/api/v1/users/${userId}`,
    withCredentials: true, // Ensure cookies are sent and received
  });
}

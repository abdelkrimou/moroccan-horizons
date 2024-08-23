import axios from "axios";

export async function updateUser({ userId, updatedData }) {
  await axios({
    method: "PATCH",
    url: `http://127.0.0.1:8000/api/v1/users/${userId}`,
    data: updatedData,
    withCredentials: true, // Ensure cookies are sent and received
  });
}

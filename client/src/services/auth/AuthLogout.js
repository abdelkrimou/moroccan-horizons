import axios from "axios";

export async function logout() {
  await axios({
    method: "GET",
    url: "http://127.0.0.1:8000/api/v1/users/logout",
    withCredentials: true, // Ensure cookies are sent and received
  });
}

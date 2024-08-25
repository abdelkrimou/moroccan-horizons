import axios from "axios";

export async function logout() {
  await axios({
    method: "GET",
    url: `${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/users/logout`,
    withCredentials: true, // Ensure cookies are sent and received
  });
}

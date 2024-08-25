import axios from "axios";

export async function login({ email, password }) {
  await axios({
    method: "POST",
    url: `${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/users/login`,
    data: {
      email,
      password,
    },
    withCredentials: true, // Ensure cookies are sent and received
  });
}

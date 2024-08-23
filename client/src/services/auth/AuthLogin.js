import axios from "axios";

export async function login({ email, password }) {
  await axios({
    method: "POST",
    url: "http://127.0.0.1:8000/api/v1/users/login",
    data: {
      email,
      password,
    },
    withCredentials: true, // Ensure cookies are sent and received
  });
}

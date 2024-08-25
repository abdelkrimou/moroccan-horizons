import axios from "axios";
export async function signUp({ name, email, password, passwordConfirm }) {
  await axios(`${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/users/signup`, {
    method: "POST",
    data: {
      name,
      email,
      password,
      passwordConfirm,
    },
    withCredentials: true, // Ensure cookies are sent and received
  });
}

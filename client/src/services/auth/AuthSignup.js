import axios from "axios";
export async function signUp({ name, email, password, passwordConfirm }) {
  await axios("http://127.0.0.1:8000/api/v1/users/signup", {
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

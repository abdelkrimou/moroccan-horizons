import axios from "axios";

export async function updateProfileInfos(updatedData) {
  await axios({
    method: "PATCH",
    url: `${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/users/updateMe`,
    data: updatedData,
    withCredentials: true, // Ensure cookies are sent and received
  });
}
export async function updateProfilePassword(updatedPassword) {
  await axios({
    method: "PATCH",
    url: `${
      import.meta.env.VITE_BACKEND_BASEURL
    }/api/v1/users/updateMyPassword`,
    data: updatedPassword,
    withCredentials: true, // Ensure cookies are sent and received
  });
}

import UpdateProfile from "../components/layout/UpdateProfile";
import UpdatePassword from "../components/layout/UpdatePassword";

function UserSettings() {
  return (
    <>
      <UpdateProfile />
      <hr />
      <UpdatePassword />
    </>
  );
}

export default UserSettings;

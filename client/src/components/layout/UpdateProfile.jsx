import { useForm } from "react-hook-form";
import PrimaryBtn from "../ui/PrimaryBtn";
import { CgProfile } from "react-icons/cg";
import validator from "validator";
import { useAuth } from "../../services/auth/IsLoggedIn";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import LoadingPage from "../common/LoadingPage";
import { updateProfileInfos } from "../../services/user/UpdateProfileInfos";
import toast from "react-hot-toast";
import LoadingSpinner from "../common/LoadingSpinner";
function UpdateProfile() {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading, setUser } = useAuth();
  const originalUser = { ...user };

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate("/");
    }
  }, [isAuthenticated, navigate, loading]);

  const validatePhotoType = (fileList) => {
    if (fileList.length === 0) {
      return;
    }
    const photo = fileList[0];
    const validTypes = ["image/jpeg", "image/png"];

    if (!validTypes.includes(photo.type)) {
      return "Please upload a JPEG or PNG  file";
    }
    const maxSize = 4 * 1024 * 1024; // 5MB in bytes
    if (photo.size > maxSize) {
      return "File size must be less than 4MB";
    }

    return true;
  };
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const updatedData = new FormData();
      updatedData.append("name", data.name);
      updatedData.append("email", data.email);
      if (data.photo && data.photo[0]) {
        updatedData.append("photo", data.photo[0]);
      }
      await updateProfileInfos(updatedData);
      setUser((prevUser) => ({
        ...prevUser,
        name: data.name,
        email: data.email,
      }));
      reset();
      toast.success("You have updated your data successfully !");
    } catch (error) {
      setUser(originalUser);
      toast.error(
        error?.response?.data?.message || "Failed to update profile !"
      );
    }
  };
  if (loading) return <LoadingPage />;
  return (
    <div className="max-w-[600px] m-auto  rounded-lg  py-10 px-5">
      <h2 className="text-[30px]  font-mainFont text-accentGreen mb-8">
        Your account settings
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="font-mainFont w-full m-auto flex flex-col gap-5 "
      >
        <label className="font-light text-mainGreen" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          className="px-3 mt-[-10px] py-4 text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
          type="text"
          defaultValue={user?.name}
          placeholder="demo name"
          {...register("name", {
            minLength: {
              value: 4,
              message: "Your name should have at least 4 characters",
            },
          })}
        />
        {errors.name && (
          <span className="text-red-500 text-[12px] font-textFont font-light uppercase mt-[-10px]">
            {errors.name.message}
          </span>
        )}
        <label className="font-light text-mainGreen" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          className="px-3 mt-[-10px] py-4 text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
          type="email"
          defaultValue={user?.email}
          placeholder="You@example.com"
          {...register("email", {
            validate: (value) =>
              validator.isEmail(value) || "Invalid email format",
          })}
        />
        {errors.email && (
          <span className="text-red-500 text-[12px] font-textFont font-light uppercase mt-[-10px]">
            {errors.email.message}
          </span>
        )}
        <label
          htmlFor="image"
          className="text-sm w-fit hover:translate-y-1 transition-all duration-200 ease-in-out mt-3 hover:underline cursor-pointer text-mainGreen"
        >
          <CgProfile className="text-[50px] hover:scale-[1.025] transition-all duration-200 ease-in-out inline-block mr-2" />
          [Upload your profile picture]
        </label>
        <input
          {...register("photo", {
            validate: validatePhotoType,
          })}
          className="hidden"
          type="file"
          id="image"
        />
        {errors.photo && (
          <span className="text-red-500 text-[12px] font-textFont font-light uppercase ">
            {errors.photo.message}
          </span>
        )}
        <span className="block self-end mt-5 ">
          <PrimaryBtn type="submit">
            {isSubmitting ? (
              <span className="flex gap-4 items-center">
                Saving <LoadingSpinner />
              </span>
            ) : (
              "save settings"
            )}
          </PrimaryBtn>
        </span>
      </form>
    </div>
  );
}

export default UpdateProfile;

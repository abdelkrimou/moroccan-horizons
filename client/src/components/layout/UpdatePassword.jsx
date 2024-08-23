import { useForm } from "react-hook-form";
import PrimaryBtn from "../ui/PrimaryBtn";
import Container from "../layout/Container";
import toast from "react-hot-toast";
import { updateProfilePassword } from "../../services/user/UpdateProfileInfos";
import LoadingSpinner from "../common/LoadingSpinner";

function UpdatePassword() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const updatedPass = data;
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await updateProfilePassword(updatedPass);
      reset();
      // window.location.reload(true);
      toast.success("You have updated your password successfully !");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <Container>
      <div className="max-w-[600px]  m-auto my-20 bg-accentYellow/10 py-10 px-5 shadow-md rounded-lg">
        <h2 className="text-[30px] font-mainFont text-accentGreen mb-8">
          Create your new account
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="font-mainFont w-full flex flex-col gap-4 "
        >
          <label className="font-light text-mainGreen" htmlFor="curr-pass">
            Current Password
          </label>
          <input
            id="curr-pass"
            className="px-3 mt-[-10px] py-4 text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
            type="password"
            placeholder="Enter Your current Password"
            {...register("passwordCurrent", {
              required: "What is your current password? ",
            })}
          />
          {errors.passwordCurrent && (
            <span className="text-red-500 text-[12px] font-textFont font-light uppercase mt-[-10px]">
              {errors.passwordCurrent.message}
            </span>
          )}
          <label className="font-light text-mainGreen" htmlFor="new-pass">
            New Password
          </label>
          <input
            id="new-pass"
            className="px-3 mt-[-10px] py-4 text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
            type="password"
            placeholder="Enter Your new Password"
            {...register("password", {
              required: "Please Enter Your New Password ",
              minLength: {
                value: 8,
                message: "The password should have at least 8 characters",
              },
            })}
          />
          {errors.password && (
            <span className="text-red-500 text-[12px] font-textFont font-light uppercase mt-[-10px]">
              {errors.password.message}
            </span>
          )}
          <label className="font-light text-mainGreen" htmlFor="confirm-pass">
            Password Confirmation
          </label>

          <input
            id="confirm-pass"
            {...register("passwordConfirm", {
              required: "Please Confirm Your Password",
              minLength: {
                value: 8,
                message: "The password should have at least 8 characters",
              },
              validate: (val) =>
                val === watch("password") || "The passwords do not match",
            })}
            className="px-3 py-4 mt-[-10px] text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
            type="password"
            placeholder="Please Confirm Your Password"
          />
          {errors.passwordConfirm && (
            <span className="text-red-500 text-[12px] font-textFont font-light uppercase mt-[-10px]">
              {errors.passwordConfirm.message}
            </span>
          )}

          <span className="block self-end mt-5">
            <PrimaryBtn type="submit">
              {isSubmitting ? (
                <span className="flex gap-3 items-center">
                  Updating <LoadingSpinner />
                </span>
              ) : (
                "Update Password"
              )}
            </PrimaryBtn>
          </span>
        </form>
      </div>
    </Container>
  );
}

export default UpdatePassword;

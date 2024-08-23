import { useForm } from "react-hook-form";
import PrimaryBtn from "../components/ui/PrimaryBtn";
import validator from "validator";
import { useNavigate } from "react-router-dom";
import Container from "../components/layout/Container";
import { login } from "../services/auth/AuthLogin";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/common/LoadingSpinner";
function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await login(data);
      toast.success("You have logged in Successfully !");
      reset();
      navigate("/");
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    }
  };
  return (
    <Container>
      <div className="max-w-[600px] m-auto my-20 shadow-md rounded-lg bg-accentYellow/10 py-10 px-5">
        <h2 className="text-[30px] font-mainFont text-accentGreen mb-8">
          Log into your account
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="font-mainFont w-full flex flex-col gap-3 "
        >
          <label className="font-light text-mainGreen" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            defaultValue={"admin@test.com"}
            className="px-3 mt-[-10px] py-4 text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
            type="email"
            placeholder="You@example.com"
            {...register("email", {
              required: "Please Enter Your Email ",
              validate: (value) =>
                validator.isEmail(value) || "Invalid email format",
            })}
          />
          {errors.email && (
            <span className="text-red-500 text-[12px] font-textFont font-light uppercase mt-[-10px]">
              {errors.email.message}
            </span>
          )}
          <label className="font-light text-mainGreen" htmlFor="password">
            Password
          </label>

          <input
            id="password"
            defaultValue={12345678}
            {...register("password", {
              required: "Please provide your password",
              minLength: {
                value: 8,
                message: "The password should have at least 8 characters",
              },
            })}
            className="px-3 py-4 mt-[-10px] text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
            type="password"
            placeholder="********"
          />
          {errors.password && (
            <span className="text-red-500 text-[12px] font-textFont font-light uppercase mt-[-10px]">
              {errors.password.message}
            </span>
          )}
          <span className="block self-end  mt-5">
            <PrimaryBtn type="submit">
              {isSubmitting ? (
                <span className="flex items-center gap-3">
                  Login <LoadingSpinner />
                </span>
              ) : (
                "log in"
              )}
            </PrimaryBtn>
          </span>
        </form>
      </div>
    </Container>
  );
}

export default Login;

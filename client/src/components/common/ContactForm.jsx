import { useForm } from "react-hook-form";
import PrimaryBtn from "../ui/PrimaryBtn";
import validator from "validator";
import toast from "react-hot-toast";

function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
      reset();
      toast.success("We have receieved your message successfully");
    } catch (error) {
      toast.error(error.message);
      console.error("Failed to submit:", error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="font-mainFont w-full flex flex-col gap-3 "
    >
      <input
        {...register("name", {
          required: "Please Enter Your name ",
        })}
        className="px-3 py-4 text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
        type="text"
        placeholder="Your Name"
      />
      {errors.name && (
        <span className="text-red-500 text-[12px] font-textFont font-light uppercase mt-[-10px]">
          {errors.name.message}
        </span>
      )}

      <input
        className="px-3 py-4 text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
        type="email"
        placeholder="Your Email"
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

      <input
        {...register("subject", {
          required: "What the topic you want to talk about ?",
        })}
        className="px-3 py-4 text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
        type="text"
        placeholder="Subject"
      />
      {errors.subject && (
        <span className="text-red-500 text-[12px] font-textFont font-light uppercase mt-[-10px]">
          {errors.subject.message}
        </span>
      )}
      <textarea
        {...register("textMessage", {
          required: "Please provide a message ",
          minLength: {
            value: 100,
            message: "The message should have at least 100 characters",
          },
        })}
        className="px-3 text-mainGreen py-4 bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
        rows="10"
        type="text"
        placeholder="What you want to talk about"
      ></textarea>
      {errors.textMessage && (
        <span className="text-red-500 text-[12px]  font-textFont font-light uppercase mt-[-10px]">
          {errors.textMessage.message}
        </span>
      )}
      <span className="block self-end mt-5">
        <PrimaryBtn type="submit">
          {isSubmitting ? "Submitting ..." : "Submit"}
        </PrimaryBtn>
      </span>
    </form>
  );
}

export default ContactForm;

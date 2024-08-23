import { useForm } from "react-hook-form";
import Container from "../components/layout/Container";
import { IoCloudUploadOutline } from "react-icons/io5";
import toast from "react-hot-toast";

function ApplyCV() {
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors, isSubmitting },
  } = useForm();

  const validateFileType = (fileList) => {
    if (fileList.length === 0) {
      return "Please upload a file";
    }

    const file = fileList[0];
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!validTypes.includes(file.type)) {
      return "Please upload a PDF or DOC/DOCX file";
    }
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      return "File size must be less than 5MB";
    }

    return true;
  };

  const onSubmit = async (data) => {
    // Example async operation
    try {
      // Simulate an API request
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
      toast.success("We receievd your cv successfully");
      reset();
    } catch (error) {
      toast.error(error.message);

      console.error("Failed to submit:", error);
    }
  };
  return (
    <Container>
      <main className="min-h-screen text-mainGreen text-center flex flex-col gap-10 font-textFont">
        <div className="flex flex-col text-[18px] mt-10 gap-4">
          <h2 className=" text-center text-[35px] border-b-[0.5px] pb-3 w-fit m-auto border-mainGreen font-light">
            Join Our Team of Expert Tour Guides:
          </h2>
          <p className="font-light">
            Are you passionate about sharing the beauty and culture of Morocco
            with travelers from around the world? Do you have the experience,
            knowledge, and enthusiasm to lead unforgettable tours? If so, we’d
            love to hear from you!
          </p>
          <p className="font-light">
            At Moroccan Horizons, we are always on the lookout for experienced
            and knowledgeable tour guides who can help us deliver exceptional
            experiences to our guests.
          </p>
        </div>
        <div>
          <h3 className=" text-center text-2xl border-b-[0.25px] w-fit m-auto pb-3 mb-5 border-mainGreen">
            How to Apply{" "}
          </h3>
          <p className="font-light">
            We’ve made the application process quick and easy. Simply upload
            your CV, and our team will review your experience. If your
            qualifications align with our needs, we’ll reach out to discuss the
            next steps.
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex justify-center mt-6 gap-3 items-center "
          >
            <label
              className="hover:underline hover:text-mainGreen/80 cursor-pointer"
              htmlFor="cv-file"
            >
              <IoCloudUploadOutline className="inline-block mr-3 text-2xl" />
              [Upload Your CV]
            </label>

            <input
              id="cv-file"
              className="hidden"
              type="file"
              {...register("file", {
                validate: validateFileType,
              })}
            />

            <button
              className="px-2 py-1 bg-accentYellow uppercase font-mainFont hover:bg-accentYellow/40 text-sm"
              type="submit"
            >
              {isSubmitting ? "..." : "Submit"}
            </button>
          </form>
          {errors.file && (
            <span className="text-red-500 text-[12px] font-textFont font-light uppercase ">
              {errors.file.message}
            </span>
          )}
          <p className="text-[12px] font-textFont font-light">
            Supported formats: PDF, DOCX (Max 5MB)
          </p>
        </div>
        <div>
          <h2 className="mb-8 text-center text-[35px] border-b-[0.5px] pb-3 w-fit m-auto border-mainGreen font-light">
            Why Work With Us?
          </h2>
          <div className="flex md:flex-row gap-4 flex-col md:items-start items-center">
            <div className="md:w-1/3 w-full border-[1px] overflow-hidden rounded-lg">
              <h3 className="text-center text-2xl bg-mainYellow/20   m-auto px-5 py-2  font-headFont">
                Flexible Schedules
              </h3>
              <p className="font-light p-4">
                Work on your terms, with full-time, part-time, and seasonal
                opportunities.
              </p>
            </div>
            <div className="md:w-1/3 w-full border-[1px] overflow-hidden rounded-lg">
              <h3 className="text-center text-2xl bg-mainYellow/20   m-auto px-5 py-2  font-headFont">
                Competitive Pay
              </h3>
              <p className="font-light p-4">
                Earn competitive rates for your expertise and passion.
              </p>
            </div>
            <div className="md:w-1/3 w-full border-[1px]  overflow-hidden rounded-lg">
              <h3 className="text-center text-2xl bg-mainYellow/20   m-auto px-5 py-2  font-headFont">
                Diverse Opportunities
              </h3>
              <p className="font-light   p-4">
                Guide tours that align with your interests, whether in bustling
                cities, serene deserts, or ancient landmarks.
              </p>
            </div>
          </div>
        </div>

        <p className="my-10">
          Ready to share your love for Morocco with the world? Apply today and
          join our team of expert tour guides at Moroccan Horizons.
        </p>
      </main>
    </Container>
  );
}

export default ApplyCV;

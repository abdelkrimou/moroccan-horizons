// import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import PrimaryBtn from "../components/ui/PrimaryBtn";
import SecondaryBtn from "../components/ui/SecondaryBtn";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";
import { UseModalsContext } from "../Context/ModalsContext";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { addReview } from "../services/reviews/AddReview";
import { useQueryClient } from "@tanstack/react-query";
function AddReviewModal({ tour }) {
  const queryClient = useQueryClient();
  const { setIsAddReviewModalOpen } = UseModalsContext();
  const tourId = tour?._id;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await addReview({ tourId, data });
      reset();
      setIsAddReviewModalOpen(false);
      toast.success("You have successfully added your review !");
      await queryClient.refetchQueries(["user-review"]);
    } catch (error) {
      toast.error("You have already created a review on this tour !!");
    }
  };
  return (
    <div className="fixed center bg-mainGreen/20  z-50  inset-0">
      <div className="bg-white relative flex items-center shadow-lg  overflow-auto  rounded-lg lg:w-[70%] w-[95%] h-[85%] mt-[5%] mb-[5%] m-auto">
        <RxCross2
          onClick={() => setIsAddReviewModalOpen(false)}
          className="absolute top-6 right-6 text-3xl cursor-pointer text-black/50 hover:text-black"
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="font-mainFont px-4 max-w-[600px] py-4 m-auto flex-1 w-full flex flex-col gap-3 "
        >
          <label className="font-light text-mainGreen">Tour</label>
          <input
            readOnly
            id="tour"
            className="px-3 mt-[-10px] capitalize py-4 mb-3 text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
            type="text"
            defaultValue={tour?.name}
            placeholder="The tour name"
            {...register("tour", {
              required: true,
            })}
          />
          <label htmlFor="rating" className="font-light text-mainGreen">
            Rating
          </label>

          <input
            id="rating"
            className="px-3 mt-[-10px] py-4 text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
            type="number"
            defaultValue={4}
            step="0.1" // Allows decimal values like 4.5
            placeholder="how much do you rate the tour ?"
            {...register("rating", {
              required: "A tour must have a rating",
              min: {
                value: 1,
                message: "The rating should be between 1 and 5",
              },
              max: {
                value: 5,
                message: "The rating should be 5 or below",
              },
            })}
          />
          {errors.rating && (
            <span className="text-red-500 text-sm font-light font-textFont">
              {errors.rating.message}
            </span>
          )}
          <label htmlFor="review" className="font-light text-mainGreen">
            Review
          </label>
          <textarea
            rows={6}
            id="review"
            className="px-3  mt-[-10px] py-4 text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
            type="text"
            placeholder="how was the trip ...?"
            {...register("review", {
              required: "A tour must have a text review",
              minLength: {
                value: 50,
                message: "The review should have at least 50 characters",
              },
              maxLength: {
                value: 150,
                message: "The review should have no longer than 150 characters",
              },
            })}
          />

          {errors.review && (
            <span className="text-red-500 text-sm font-light font-textFont">
              {errors.review.message}
            </span>
          )}
          <div className=" self-end mt-9 flex gap-3">
            <SecondaryBtn
              disabled={isSubmitting}
              onClick={() => setIsAddReviewModalOpen(false)}
            >
              Cancel
            </SecondaryBtn>
            <PrimaryBtn disabled={isSubmitting} type="submit">
              {isSubmitting ? (
                <span className="flex gap-2">
                  Adding ... <LoadingSpinner />
                </span>
              ) : (
                "Add Review"
              )}
            </PrimaryBtn>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddReviewModal;

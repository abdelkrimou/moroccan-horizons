// import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import PrimaryBtn from "../components/ui/PrimaryBtn";
import SecondaryBtn from "../components/ui/SecondaryBtn";
import { RxCross2 } from "react-icons/rx";
import { UseModalsContext } from "../Context/ModalsContext";
import { bookTour } from "../services/booking/BookTour";

function BookingModal({ tour, user }) {
  // const navigate = useNavigate();
  const { setIsBookingModalOpen } = UseModalsContext();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const tourId = tour._id;
    const quantity = data.nPeople;
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await bookTour(tourId, quantity);
      console.log(data);
      reset();
      setIsBookingModalOpen(false);
      // navigate("/");
    } catch (error) {
      console.error("Failed to submit:", error);
    }
  };
  return (
    <div className="fixed center bg-mainGreen/20  z-50  inset-0">
      <div className="bg-white relative flex items-center shadow-lg  overflow-auto  rounded-lg lg:w-[70%] w-[95%] h-[85%] mt-[5%] mb-[5%] m-auto">
        <RxCross2
          onClick={() => setIsBookingModalOpen(false)}
          className="absolute top-6 right-6 text-3xl cursor-pointer text-black/50 hover:text-black"
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="font-mainFont px-4 max-w-[600px] py-4 m-auto flex-1 w-full flex flex-col gap-3 "
        >
          <label className="font-light text-mainGreen">Your infos</label>
          <input
            id="full-name"
            className="px-3 mt-[-10px] py-4 mb-3 text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
            type="text"
            defaultValue={user?.name}
            placeholder="Your name"
            {...register("name")}
            readOnly
          />
          <input
            id="email"
            className="px-3 mt-[-10px] py-4 text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
            type="email"
            defaultValue={user?.email}
            placeholder="Your Email"
            {...register("email")}
            readOnly
          />
          <label className="font-light text-mainGreen" htmlFor="n-people">
            Number of People
          </label>
          <input
            {...register("nPeople", {
              required: "At least it should be one",
              min: {
                value: 1,
                message: "At least one should take the tour",
              },
            })}
            id="n-people"
            className="px-3 mt-[-10px] py-4 text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
            type="number"
            min={1}
            placeholder="How many of you ?"
            defaultValue={1}
          />
          {errors.nPeople && (
            <span className="text-red-500 text-sm font-light font-textFont">
              {errors.nPeople.message}
            </span>
          )}
          <label className="font-light text-mainGreen" htmlFor="password">
            Tour
          </label>
          <input
            readOnly
            {...register("tour", { required: "Please select a tour" })}
            value={tour.name}
            className="px-3 py-4 mt-[-10px] capitalize text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
          />

          {errors.tour && (
            <span className="text-red-500 text-[12px] font-textFont font-light uppercase mt-[-10px]">
              {errors.tour.message}
            </span>
          )}
          <span className="font-light text-mainGreen">Price Total ($)</span>
          <input
            {...register("priceTotal", {
              required: "A tour must have a price",
            })}
            defaultValue={tour?.price}
            value={watch("nPeople") && tour?.price * Number(watch("nPeople"))}
            readOnly
            className="px-3 py-4 mt-[-10px] text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
          />

          <div className=" self-end mt-9 flex gap-3">
            <SecondaryBtn onClick={() => setIsBookingModalOpen(false)}>
              Cancel
            </SecondaryBtn>

            <PrimaryBtn type="submit">
              {isSubmitting ? "Submitting ..." : "Proceed to payment"}
            </PrimaryBtn>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookingModal;

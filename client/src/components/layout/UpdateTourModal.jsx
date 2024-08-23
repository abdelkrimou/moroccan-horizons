import React from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { UseModalsContext } from "../../Context/ModalsContext";
import PrimaryBtn from "../ui/PrimaryBtn";
import SecondaryBtn from "../ui/SecondaryBtn";

function UpdateTourModal() {
  const { setIsTourModalOpen } = UseModalsContext();
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
      setIsTourModalOpen(false);
    } catch (error) {
      console.error("Failed to submit:", error);
    }
  };

  return (
    <div className="fixed center bg-mainGreen/20  z-50  inset-0">
      <div className="bg-white flex-col relative py-6 flex  items-start shadow-lg  overflow-auto  rounded-lg lg:w-[70%] w-[95%] h-[85%] mt-[5%] mb-[5%] m-auto">
        <RxCross2 className="absolute top-6 right-6 text-3xl cursor-pointer text-black/50 hover:text-black" />
        <form
          className="max-w-[700px] md:min-w-[500px] min-w-[300px] grow-1  flex flex-col gap-5 m-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="text-mainGreen text-[40px] font-textFont">
            Create new Tour
          </h3>

          {/* Tour Name */}
          <div className="flex flex-col ">
            <input
              className="px-3 mt-[-10px] py-4 mb-3 text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
              id="name"
              type="text"
              placeholder="Tour Name"
              {...register("name", {
                required: "Tour name is required",
                minLength: {
                  value: 8,
                  message: "The tour name should have at least 8 characters",
                },
              })}
            />
            {errors.name && (
              <span className="text-red-500 mt-[-10px] text-sm font-light  font-textFont">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Duration */}

          <div className="flex flex-col ">
            <input
              className="px-3 mt-[-10px] py-4 mb-3 text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
              id="maxGroupSize"
              type="number"
              placeholder="Max Group Size"
              {...register("maxGroupSize", {
                required: "Max group size is required",
              })}
            />
            {errors.maxGroupSize && (
              <span className="text-red-500 mt-[-10px] text-sm font-light font-textFont">
                {errors.maxGroupSize.message}
              </span>
            )}
          </div>

          <div className="flex flex-col ">
            <select
              className="px-3 mt-[-10px] py-4 mb-3 text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
              id="difficulty"
              {...register("difficulty", {
                required: "Difficulty is required",
              })}
            >
              <option value="">Select Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="difficult">Difficult</option>
            </select>
            {errors.difficulty && (
              <span className="text-red-500 mt-[-10px] text-sm font-light font-textFont">
                {errors.difficulty.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2 font-textFont font-light">
            <label className="font-normal">Select guides:</label>
            <div className="flex flex-row gap-2 ">
              <div className="p-2 cursor-pointer rounded-lg border-[0.25px] border-mainGreen">
                <input
                  className=" cursor-pointer"
                  type="checkbox"
                  id="amir-aziz"
                  value="amir-aziz"
                  {...register("guides", {
                    required: "Select at least one guide",
                  })}
                />
                <label className="ml-2 cursor-pointer" htmlFor="amir-aziz">
                  Amir Aziz
                </label>
              </div>
              <div className="p-2 cursor-pointer rounded-lg border-[0.25px] border-mainGreen">
                <input
                  className=" cursor-pointer"
                  type="checkbox"
                  id="karim-ou"
                  value="karim-ou"
                  {...register("guides", {
                    required: "Select at least one guide",
                  })}
                />
                <label className="ml-2 cursor-pointer" htmlFor="karim-ou">
                  Karim Ouaaddi
                </label>
              </div>
              <div className="p-2 cursor-pointer rounded-lg border-[0.25px] border-mainGreen">
                <input
                  className=" cursor-pointer"
                  type="checkbox"
                  id="ahmed-ben"
                  value="ahmed-ben"
                  {...register("guides", {
                    required: "Select at least one guide",
                  })}
                />
                <label className="ml-2 cursor-pointer" htmlFor="ahmed-ben">
                  Ahmed BenSghir
                </label>
              </div>
            </div>
            {errors.guides && (
              <span className="text-red-500 text-sm font-light font-textFont">
                {errors.guides.message}
              </span>
            )}
          </div>

          {/* <div className="flex flex-col ">
            <select
              className="px-3 mt-[-10px] py-4 mb-3 text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
              id="guides"
              {...register("guides", {
                required: "Select the guides of this tour",
              })}
            >
              <option value="">Select guides</option>
              <option value="amir-aziz">Amir Aziz</option>
              <option value="karim-ou">Karim ouaaddi</option>
              <option value="ahmed-ben">Ahmed BenSghir</option>
            </select>
            {errors.guides && (
              <span className="text-red-500 mt-[-10px] text-sm font-light font-textFont">
                {errors.guides.message}
              </span>
            )}
          </div> */}

          {/* Price */}
          <div className="flex flex-col ">
            <input
              className="px-3 mt-[-10px] py-4 mb-3 text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
              id="price"
              type="number"
              placeholder="Tour Price"
              {...register("price", { required: "Price is required" })}
            />
            {errors.price && (
              <span className="text-red-500 mt-[-10px] text-sm font-light font-textFont">
                {errors.price.message}
              </span>
            )}
          </div>

          {/* Summary */}
          <div className="flex flex-col ">
            <textarea
              className="px-3 mt-[-10px] py-4 mb-3 text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
              id="summary"
              placeholder="Short Summary of the Tour"
              {...register("summary", { required: "Summary is required" })}
            />
            {errors.summary && (
              <span className="text-red-500 mt-[-10px] text-sm font-light font-textFont">
                {errors.summary.message}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col ">
            <textarea
              className="px-3 mt-[-10px] py-4 mb-3 text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
              id="description"
              placeholder="Detailed Description"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <span className="text-red-500 mt-[-10px] text-sm font-light font-textFont">
                {errors.description.message}
              </span>
            )}
          </div>

          {/* Start Location */}
          <div className="flex flex-col ">
            <input
              className="px-3 mt-[-10px] py-4 mb-3 text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
              id="startLocation.description"
              type="text"
              placeholder="Location Description"
              {...register("startLocation.description", {
                required: "Start location description is required",
              })}
            />
            {errors.startLocation?.description && (
              <span className="text-red-500 mt-[-10px] mb-[12px] text-sm font-light font-textFont">
                {errors.startLocation.description.message}
              </span>
            )}

            <input
              className="px-3 mt-[-10px] py-4 mb-3 text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
              id="startLocation.coordinates"
              type="text"
              placeholder="Longitude, Latitude"
              {...register("startLocation.coordinates", {
                required: "Coordinates are required",
              })}
            />
            {errors.startLocation?.coordinates && (
              <span className="text-red-500 mt-[-10px] text-sm font-light font-textFont">
                {errors.startLocation.coordinates.message}
              </span>
            )}
          </div>

          {/* Images */}
          <div className="flex flex-col ">
            <input
              className="px-3 mt-[-10px] py-4 mb-3 text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
              id="images"
              type="text"
              placeholder="Image URLs"
              {...register("images", { required: "Images are required" })}
            />
            {errors.images && (
              <span className="text-red-500 mt-[-10px] text-sm font-light font-textFont">
                {errors.images.message}
              </span>
            )}
          </div>

          {/* Start Dates */}
          <div className="flex flex-col ">
            <input
              className="px-3 mt-[-10px] py-4 mb-3 text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
              id="startDates"
              type="text"
              placeholder="Start Dates (YYYY-MM-DD)"
              {...register("startDates", {
                required: "Start dates are required",
              })}
            />
            {errors.startDates && (
              <span className="text-red-500 mt-[-10px] text-sm font-light font-textFont">
                {errors.startDates.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 justify-end">
            <SecondaryBtn onClick={() => setIsTourModalOpen(false)}>
              Cancel
            </SecondaryBtn>
            <PrimaryBtn type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Save Tour"}
            </PrimaryBtn>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateTourModal;

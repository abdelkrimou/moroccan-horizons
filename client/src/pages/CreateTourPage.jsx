import { useForm } from "react-hook-form";
import SecondaryBtn from "../components/ui/SecondaryBtn";
import PrimaryBtn from "../components/ui/PrimaryBtn";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// import { useCreateTour } from "../hooks/useCreateTour";
function CreateTourPage() {
  const navigate = useNavigate();
  // create tour hook
  // const [
  //   createTour,
  //   isCreating,
  // ] = useCreateTour();
  // useForm hook (library)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  // handleSubmit
  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      //createTour(data); I commented this function so people could not miss with the data
      toast.error("You don't have the authority to create a new tour");
      console.log(data);
      reset();
    } catch (error) {
      console.error("Failed to submit:", error);
    }
  };

  return (
    <div className="">
      <div className="bg-accentYellow/10 flex-col relative py-6 flex  items-start shadow-lg  overflow-auto  rounded-lg lg:w-[70%] w-[95%] h-[85%] mt-[5%] mb-[5%] m-auto">
        <form
          className="xl:w-[60%] lg:w-[70%] w-[90%] md:w-[70%] grow-1  flex flex-col gap-3 m-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="text-mainGreen mb-8 text-[40px] font-textFont">
            Create new Tour
          </h3>

          {/* Tour Name */}
          <div className="flex flex-col gap-1">
            <label className="text-mainGreen" htmlFor="name">
              Tour name:
            </label>
            <input
              className="px-3 py-4 text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
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
              <span className="text-red-500  text-sm font-light  font-textFont">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Duration */}

          <div className="flex flex-col gap-1">
            <label className="text-mainGreen" htmlFor="duration">
              Tour duration (Days):
            </label>
            <input
              className="px-3  py-4  text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
              id="duration"
              type="number"
              placeholder="How many days this tour will take long ?"
              {...register("duration", {
                required: "A Tour must have a duration ",
              })}
            />
            {errors.duration && (
              <span className="text-red-500  text-sm font-light font-textFont">
                {errors.duration.message}
              </span>
            )}
          </div>

          {/* //maxGroupeSize */}
          <div className="flex flex-col gap-1">
            <label className="text-mainGreen" htmlFor="maxGroupSize">
              Group Size (Max):
            </label>
            <input
              className="px-3  py-4  text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
              id="maxGroupSize"
              type="number"
              placeholder="Max Group Size"
              {...register("maxGroupSize", {
                required: "Max group size is required",
              })}
            />
            {errors.maxGroupSize && (
              <span className="text-red-500  text-sm font-light font-textFont">
                {errors.maxGroupSize.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-mainGreen" htmlFor="difficulty">
              Level of Difficulty:
            </label>
            <select
              className="px-3  py-4  text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
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
              <span className="text-red-500  text-sm font-light font-textFont">
                {errors.difficulty.message}
              </span>
            )}
          </div>

          {/* Price */}
          <div className="flex flex-col gap-1">
            <label className="text-mainGreen" htmlFor="price">
              Price ($):
            </label>
            <input
              className="px-3  py-4  text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
              id="price"
              min={1}
              type="number"
              placeholder="Tour Price"
              {...register("price", { required: "Price is required" })}
            />
            {errors.price && (
              <span className="text-red-500  text-sm font-light font-textFont">
                {errors.price.message}
              </span>
            )}
          </div>

          {/* Summary */}
          <div className="flex flex-col gap-1">
            <label className="text-mainGreen" htmlFor="summary">
              Summary:
            </label>
            <textarea
              className="px-3  py-4  text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
              id="summary"
              placeholder="Short Summary of the Tour"
              {...register("summary", { required: "Summary is required" })}
            />
            {errors.summary && (
              <span className="text-red-500  text-sm font-light font-textFont">
                {errors.summary.message}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="text-mainGreen" htmlFor="description">
              Description:
            </label>
            <textarea
              className="px-3  py-4  text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
              id="description"
              placeholder="Detailed Description"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <span className="text-red-500  text-sm font-light font-textFont">
                {errors.description.message}
              </span>
            )}
          </div>

          {/* Start Location */}
          <div className="flex gap-1 flex-col ">
            <label className="text-md font-textFont text-mainGreen  ml-1">
              Start Location:
            </label>
            <input
              className="px-3  py-4  text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
              id="startLocation.description"
              type="text"
              placeholder="Location Description"
              {...register("startLocation.description", {
                required: "Start location description is required",
              })}
            />
            {errors.startLocation?.description && (
              <span className="text-red-500  mb-[12px] text-sm font-light font-textFont">
                {errors.startLocation.description.message}
              </span>
            )}
            <input
              className="px-3  py-4  text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
              id="startLocation.address"
              type="text"
              placeholder="Location Address"
              {...register("startLocation.Address", {
                required: "Start location address is required",
              })}
            />
            {errors.startLocation?.Address && (
              <span className="text-red-500  mb-[12px] text-sm font-light font-textFont">
                {errors.startLocation.Address.message}
              </span>
            )}

            <input
              className="px-3  py-4  text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
              id="startLocation.coordinates"
              type="text"
              placeholder="Coordinates: Longitude, Latitude"
              {...register("startLocation.coordinates", {
                required: "Coordinates are required",
              })}
            />
            {errors.startLocation?.coordinates && (
              <span className="text-red-500  text-sm font-light font-textFont">
                {errors.startLocation.coordinates.message}
              </span>
            )}
          </div>
          {/*  Locations */}
          <div className="flex gap-1 flex-col ">
            <label className="text-md font-textFont text-mainGreen  ml-1">
              Locations:
            </label>
            <input
              className="px-3  py-4  text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
              id="Locations.description"
              type="text"
              placeholder="Location Description"
              {...register("Locations.description", {
                required: "locations description is required",
              })}
            />
            {errors.Locations?.description && (
              <span className="text-red-500  mb-[12px] text-sm font-light font-textFont">
                {errors.Locations.description.message}
              </span>
            )}
            <input
              className="px-3  py-4  text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
              id="Locations.address"
              type="text"
              placeholder="Location Address"
              {...register("Locations.Address", {
                required: "Locations address is required",
              })}
            />
            {errors.Locations?.Address && (
              <span className="text-red-500  mb-[12px] text-sm font-light font-textFont">
                {errors.Locations.Address.message}
              </span>
            )}

            <input
              className="px-3  py-4  text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
              id="Locations.coordinates"
              type="text"
              placeholder="Coordinates: Longitude, Latitude"
              {...register("Locations.coordinates", {
                required: "Coordinates are required",
              })}
            />
            {errors.Locations?.coordinates && (
              <span className="text-red-500  text-sm font-light font-textFont">
                {errors.Locations.coordinates.message}
              </span>
            )}
          </div>

          {/* Images */}
          <div className="flex flex-col gap-1">
            <label className="text-mainGreen" htmlFor="images">
              Images:
            </label>
            <input
              className="px-3  py-4  text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
              id="images"
              type="file"
              placeholder="Image URLs"
              {...register("images", { required: "Images are required" })}
            />
            {errors.images && (
              <span className="text-red-500  text-sm font-light font-textFont">
                {errors.images.message}
              </span>
            )}
          </div>

          {/* Start Dates */}
          <div className="flex flex-col gap-1">
            <label className="text-mainGreen" htmlFor="startDates">
              Start Dates (MM/DD/YYYY):
            </label>
            <input
              className="px-3  py-4  text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
              id="startDates"
              type="date"
              placeholder="Start Dates (YYYY-MM-DD)"
              {...register("startDates", {
                required: "Start dates are required",
              })}
            />
            {errors.startDates && (
              <span className="text-red-500  text-sm font-light font-textFont">
                {errors.startDates.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 mt-5 justify-end">
            <SecondaryBtn
              disabled={isSubmitting}
              onClick={() => navigate("/admin/manage-tours")}
            >
              Cancel
            </SecondaryBtn>
            <PrimaryBtn disabled={isSubmitting} type="submit">
              {isSubmitting ? "Creating ..." : "Save Tour"}
            </PrimaryBtn>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTourPage;

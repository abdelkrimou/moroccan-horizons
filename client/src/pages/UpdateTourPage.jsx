import { useQuery } from "@tanstack/react-query";
import { getTour } from "../services/tours/GetTour";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PrimaryBtn from "../components/ui/PrimaryBtn";
import SecondaryBtn from "../components/ui/SecondaryBtn";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../components/common/LoadingPage";
import toast from "react-hot-toast";
// import { useUpdateTour } from "../hooks/useUpdateTour";
import ErrorPage from "../components/ui/ErrorPage";

function UpdateTourPage() {
  const navigate = useNavigate();

  const [tour, setTour] = useState({});
  // Update the tour hook
  // const [
  //   updateTour
  //   isUpdating,
  // ] = useUpdateTour();

  // Get tourId from the URL
  const { tourId } = useParams();
  // Fetch tour
  const { isLoading, error, data } = useQuery({
    queryKey: ["tour", tourId],
    queryFn: () => getTour(tourId),
  });
  // Use form to handle changes
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // handle Changes Function
  function onSubmit(data) {
    // const updateTour = data;
    // This is the function that will update the tour but it's commented so no-one could update a tour and mess with data
    //updateTour({tourId,updatedData})
    toast.error("You don't have the authority to update a tour");
    console.log(data);
  }
  // Set Tour and default values of tour inputs
  useEffect(() => {
    setTour(data);
    reset({
      name: tour?.name,
      duration: tour?.duration,
      maxGroupSize: tour?.maxGroupSize,
      price: tour?.price,
      summary: tour?.summary,
      description: tour?.description,
    });
  }, [data, reset, tour]);
  if (isLoading) return <LoadingPage />;
  if (error) return <ErrorPage />;
  return (
    <div className="">
      <div className="bg-accentYellow/10 flex-col relative py-6 flex  items-start shadow-lg  overflow-auto  rounded-lg lg:w-[70%] w-[95%] h-[85%] mt-[5%] mb-[5%] m-auto">
        <form
          className="max-w-[900px]  md:min-w-[600px] min-w-[300px] grow-1 gap-4  flex flex-col m-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="text-mainGreen mb-8 text-[35px] font-textFont">
            Update tour: {tour?.name}
          </h3>

          {/* Tour Name */}

          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="font-textFont ml-1 ">
              Tour name:
            </label>
            <input
              className="px-3  py-4  text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
              id="name"
              type="text"
              readOnly
              placeholder="Tour Name"
              {...register("name")}
            />
          </div>

          {/* Duration */}

          <div className="flex flex-col gap-1">
            <label htmlFor="duration" className="font-textFont ml-1 ">
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
              <span className="text-red-500 text-sm font-light font-textFont">
                {errors.duration.message}
              </span>
            )}
          </div>

          {/* //maxGroupeSize */}
          <div className="flex flex-col gap-1">
            <label htmlFor="maxGroupSize" className="font-textFont ml-1 ">
              Groupe Size (max):
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

          {/* Price */}
          <div className="flex flex-col gap-1">
            <label htmlFor="price" className="font-textFont ml-1 ">
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
            <label htmlFor="summary" className="font-textFont ml-1 ">
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
            <label htmlFor="description" className="font-textFont ml-1 ">
              Description:
            </label>
            <textarea
              className="px-3  py-4  text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-md focus:ring-[1px] ring-mainGreen "
              id="description"
              rows={5}
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

          {/* Start Dates */}
          <div className="flex flex-col mb-8">
            <label htmlFor="startDates" className="font-textFont ml-1 ">
              Start Dates (mm/dd/yyyy):
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
          <div className="flex gap-3 justify-end">
            <SecondaryBtn
              disabled={isSubmitting}
              onClick={() => navigate("/admin/manage-tours")}
            >
              Cancel
            </SecondaryBtn>
            <PrimaryBtn disabled={isSubmitting} type="submit">
              {isSubmitting ? "Submitting..." : "Save Changes"}
            </PrimaryBtn>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateTourPage;

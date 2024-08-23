import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { MdEditDocument } from "react-icons/md";
import { useState } from "react";
//import { useDeleteTour } from "../../hooks/useDeleteTour";
import toast from "react-hot-toast";
function ManageToursTableRow({ tour, isLast }) {
  const [showConfirmDel, setShowConfirmDel] = useState(false);
  //const tourId = tour?._id;
  // hook for deleting the tour
  //const [deleteTour, isDeleting] = useDeleteTour();
  function handleDeleteTour() {
    toast.error("You don't have the authority to delete this tour");
    //deleteTour(tourId); I commented This so admins could not mess with the data
  }
  return (
    <>
      <li
        className={`p-3 ${
          isLast ? "" : "border-b-[0.25px]"
        } border-r-[0.25px] w-full  capitalize hover:underline border-mainGreen`}
      >
        <Link to={`/${tour?.nameSlug}`}>{tour.name}</Link>
      </li>
      <li
        className={`p-3 ${
          isLast ? "" : "border-b-[0.25px]"
        } border-r-[0.25px]  border-mainGreen`}
      >
        {tour.maxGroupSize} People
      </li>
      <li
        className={`p-3 ${
          isLast ? "" : "border-b-[0.25px]"
        } border-r-[0.25px]  border-mainGreen`}
      >
        {tour?.guides?.map((guide, i) => (
          <span className="text-mainGreen" key={i}>
            "{guide?.name}" {i !== tour?.guides?.length - 1 && " , "}
          </span>
        ))}
      </li>
      <li
        className={`p-3 ${
          isLast ? "" : "border-b-[0.25px]"
        } border-r-[0.25px]  border-mainGreen`}
      >
        {tour.difficulty}
      </li>
      <li
        className={`p-3 ${
          isLast ? "" : "border-b-[0.25px]"
        } border-r-[0.25px]  border-mainGreen`}
      >
        {tour.duration} Days
      </li>

      <li
        className={`p-3 flex flex-wrap gap-4 ${
          isLast ? "" : "border-b-[0.25px]"
        }  capitalize border-mainGreen `}
      >
        <Link
          to={`/tours/update/${tour?._id}`}
          className="bg-green-400 relative h-fit px-2 py-3 rounded-lg text-white cursor-pointer text-sm hover:bg-green-500 group"
        >
          <MdEditDocument className="text-lg" />
          <button className="absolute hidden text-white bg-mainGreen px-2 py-3 rounded-md translate-x-[-50%] translate-y-[-110%] top-0 text-sm group-hover:block left-1/2">
            Update
          </button>
        </Link>
        <div className="bg-red-400 relative h-fit text-white cursor-pointer hover:bg-red-500 px-2 text-sm rounded-lg group">
          {!showConfirmDel ? (
            <div
              onClick={() => setShowConfirmDel(true)}
              className="bg-red-400 relative text-white py-3 cursor-pointer hover:bg-red-500  text-sm rounded-lg group transition-all duration-200 ease-in-out"
            >
              <MdDelete className="text-lg " />
            </div>
          ) : (
            <button
              className="bg-red-400 relative uppercase text-white h-[40px] cursor-pointer hover:bg-red-500 px-2 text-[10px] rounded-lg group transition-all duration-200 ease-in-out"
              onMouseLeave={() => setShowConfirmDel(false)}
              onClick={handleDeleteTour}
            >
              delete
            </button>
          )}
        </div>
      </li>
    </>
  );
}

export default ManageToursTableRow;

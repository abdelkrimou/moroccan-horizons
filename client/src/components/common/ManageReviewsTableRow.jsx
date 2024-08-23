import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useDeleteMyReview } from "../../hooks/useDeleteMyReview";
function ManageReviewsTableRow({ review, isLast }) {
  const [showConfirmDel, setShowConfirmDel] = useState(false);
  const reviewId = review?._id;
  const [deleteMyReview, isDeleting] = useDeleteMyReview();

  function deleteReview() {
    deleteMyReview(reviewId);
  }
  return (
    <>
      <li
        className={`p-3 ${
          isLast ? "" : "border-b-[0.25px]"
        } border-r-[0.25px] w-full  capitalize border-mainGreen`}
      >
        {review?.user?.name}
      </li>
      <li
        className={`p-3 ${
          isLast ? "" : "border-b-[0.25px]"
        } border-r-[0.25px] font-semibold border-mainGreen`}
      >
        {review?.tour?.name}
      </li>
      <li
        className={`p-3 ${
          isLast ? "" : "border-b-[0.25px]"
        } border-r-[0.25px] italic text-gray-500 border-mainGreen`}
      >
        {review?.review}
      </li>
      <li
        className={`p-3 ${
          isLast ? "" : "border-b-[0.25px]"
        } border-r-[0.25px]  border-mainGreen`}
      >
        {review?.rating}
      </li>
      <li
        className={`p-3 flex flex-wrap gap-4 ${
          isLast ? "" : "border-b-[0.25px]"
        }  capitalize border-mainGreen `}
      >
        {!showConfirmDel ? (
          <div
            onClick={() => setShowConfirmDel(true)}
            className="bg-red-400 relative text-white h-[40px] cursor-pointer hover:bg-red-500 px-2 text-sm rounded-lg group transition-all duration-200 ease-in-out"
          >
            <MdDelete className="text-lg mt-[10px]" />{" "}
          </div>
        ) : (
          <button
            disabled={isDeleting}
            className="bg-red-400 relative uppercase text-white h-[40px] cursor-pointer hover:bg-red-500 px-2 text-[10px] rounded-lg group transition-all duration-200 ease-in-out"
            onMouseLeave={() => setShowConfirmDel(false)}
            onClick={deleteReview}
          >
            delete
          </button>
        )}
        <span
          className={`absolute hidden text-white bg-red-700 p-1 rounded-md translate-x-[-50%] translate-y-[-110%] top-0 text-sm group-hover:${
            !showConfirmDel && "block"
          } left-1/2`}
        >
          Delete
        </span>
      </li>
    </>
  );
}

export default ManageReviewsTableRow;

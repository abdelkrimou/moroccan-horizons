import { MdDelete } from "react-icons/md";
import { MdEditDocument } from "react-icons/md";
import { useDeleteMyReview } from "../../hooks/useDeleteMyReview";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useUpdateMyReview } from "../../hooks/useUpdateMyReview";

function ReviewTableRow({ review, isLast }) {
  const [showConfirmDel, setShowConfirmDel] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  const reviewId = review?._id;
  const [deleteMyReview, isDeleting] = useDeleteMyReview();
  const [updateMyReview, isUpdating] = useUpdateMyReview();
  //
  const [updatedReview, setUpdatedReveiw] = useState(review?.review);
  const [updatedRating, setUpdatedRating] = useState(review?.rating);
  //

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = { review: updatedReview, rating: updatedRating };
    updateMyReview({ reviewId, updatedData });
    setShowUpdate(false);
  };

  function deleteReview() {
    deleteMyReview(reviewId);
  }
  return (
    <>
      <li
        className={`p-3 ${
          isLast ? "" : "border-b-[0.25px]"
        } border-r-[0.25px] w-full   capitalize border-mainGreen`}
      >
        {showUpdate ? (
          <input
            onChange={(e) => setUpdatedReveiw(e.target.value)}
            name="review"
            className="px-2 w-full py-4 text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-sm focus:ring-[1px] ring-mainGreen "
            type="text"
            value={updatedReview}
            placeholder="how was the trip ...?"
            maxLength={150}
            minLength={50}
          />
        ) : (
          review?.review
        )}
      </li>

      <li
        className={`p-3 ${
          isLast ? "" : "border-b-[0.25px]"
        } border-r-[0.25px] capitalize border-mainGreen`}
      >
        {review?.tour?.name}
      </li>
      <li
        className={`p-3 ${
          isLast ? "" : "border-b-[0.25px]"
        } border-r-[0.25px] capitalize border-mainGreen`}
      >
        {showUpdate ? (
          <input
            onChange={(e) => setUpdatedRating(e.target.value)}
            name="rating"
            value={updatedRating}
            className="px-2 py-4 text-mainGreen bg-accentYellow/30 focus:outline-none placeholder:text-sm text-md border-mainGreen/40 focus:border-0 border-[1px] rounded-sm focus:ring-[1px] ring-mainGreen "
            type="number"
            step="0.1" // Allows decimal values like 4.5
            placeholder="how much do you rate the tour ?"
            max={5}
            min={1}
          />
        ) : (
          review?.rating
        )}
      </li>
      <li
        className={`p-3 flex flex-wrap gap-2 ${
          isLast ? "" : "border-b-[0.25px]"
        }  capitalize border-mainGreen `}
      >
        {!showUpdate ? (
          <div
            onClick={() => setShowUpdate(true)}
            className="bg-green-400 relative  px-2 h-[40px] rounded-lg text-white cursor-pointer text-sm hover:bg-green-500 group"
          >
            <MdEditDocument className="text-lg mt-[10px]" />
            <span className="absolute hidden text-white bg-mainGreen p-1 rounded-md translate-x-[-50%] translate-y-[-110%] top-0 text-sm group-hover:block left-1/2">
              Update
            </span>
          </div>
        ) : (
          <>
            <button
              disabled={isDeleting || isUpdating}
              className="bg-green-400  relative transition-all duration-400 ease-in-out px-3 h-[40px] rounded-lg text-white cursor-pointer text-[13px] hover:bg-green-500 "
              // className=" mt-[10px] text-[10px] uppercase"
              onClick={handleSubmit}
            >
              Save
            </button>
            <button
              onClick={() => setShowUpdate(false)}
              className="bg-mainGreen uppercase relative transition-all duration-400 ease-in-out px-2 h-[40px] rounded-lg text-white cursor-pointer text-[18px] hover:bg-green-500 "
            >
              <RxCross2 />
            </button>
          </>
        )}

        {!showUpdate && (
          <>
            {!showConfirmDel ? (
              <div
                onClick={() => setShowConfirmDel(true)}
                className="bg-red-400 relative text-white h-[40px] cursor-pointer hover:bg-red-500 px-2 text-sm rounded-lg group transition-all duration-200 ease-in-out"
              >
                <MdDelete className="text-lg mt-[10px]" />{" "}
              </div>
            ) : (
              <button
                disabled={isDeleting || isUpdating}
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
          </>
        )}
      </li>
    </>
  );
}

export default ReviewTableRow;

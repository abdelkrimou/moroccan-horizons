import StarRating from "./StarRating";
function ReviewCard({ reviewText, rating, userName, userPhoto }) {
  return (
    <div className="review-card flex flex-col justify-between items-center self-stretch bg-amber-50 min-w-[320px] shadow-lg p-12 rounded-lg">
      <div className="flex  gap-4 mb-5 items-center w-fit m-auto">
        <img
          src={`/user-images/${userPhoto}`}
          alt=""
          className="w-[40px] h-[40px] rounded-full object-cover"
        />
        <h3 className="text-md font-textFont uppercase font-semibold text-gray-700 ">
          {userName}
        </h3>
      </div>
      <p className="font-light text-gray-500 w-fit m-auto italic text-sm font-headFont">
        {reviewText}
      </p>
      <div className="flex gap-2 items-center mt-4 justify-center">
        <StarRating rating={Math.floor(+rating)} />
      </div>
    </div>
  );
}

export default ReviewCard;

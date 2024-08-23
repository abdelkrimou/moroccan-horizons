import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
function StarRating({ rating }) {
  const length = 5;
  return (
    <>
      {Array.from({ length }, (_, i) =>
        i < rating ? (
          <FaStar
            key={i}
            className="text-2xl font-extralight text-yellow-300"
          />
        ) : (
          <CiStar key={i} className="text-2xl font-extralight" />
        )
      )}
    </>
  );
}

export default StarRating;

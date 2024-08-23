import ReviewTableRow from "../common/ReviewTableRow";

function ReviewTable({ reviews }) {
  return (
    <ul className="border-[0.5px] overflow-hidden  mt-4 divide-mainGreen grid grid-cols-reviewTable gap-x-[1px]  border-mainGreen text-mainGreen rounded-lg">
      <li className="p-2 bg-accentYellow capitalize border-b-[0.25px] font-medium border-r-[0.25px] border-mainGreen">
        Review
      </li>
      <li className="p-2 bg-accentYellow capitalize border-b-[0.25px] font-medium  border-r-[0.25px]">
        tour
      </li>
      <li className="p-2 bg-accentYellow capitalize border-b-[0.25px] font-medium  border-r-[0.25px]">
        rating
      </li>
      <li className="p-2 bg-accentYellow border-b-[0.25px] font-medium  capitalize">
        setting
      </li>
      {reviews?.map((review, i) => (
        <ReviewTableRow
          review={review}
          key={i}
          isLast={i === reviews.length - 1}
        />
      ))}
    </ul>
  );
}

export default ReviewTable;

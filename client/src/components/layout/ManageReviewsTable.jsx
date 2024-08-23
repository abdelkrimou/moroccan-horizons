import ManageReviewsTableRow from "../common/ManageReviewsTableRow";

function ManageReviewsTable({ reviews, startIndex, endIndex }) {
  return (
    <ul className="border-[0.5px]  mt-4 overflow-auto divide-mainGreen grid grid-cols-manageReviewsTable gap-x-[1px]  border-mainGreen text-mainGreen rounded-lg">
      <li className="p-2 bg-accentYellow border-b-[0.25px] font-medium border-r-[0.25px] border-mainGreen">
        Reviewer
      </li>
      <li className="p-2 bg-accentYellow border-b-[0.25px] font-medium  border-r-[0.25px]">
        Tour
      </li>
      <li className="p-2 bg-accentYellow border-b-[0.25px] font-medium  border-r-[0.25px]">
        Review
      </li>
      <li className="p-2 bg-accentYellow border-b-[0.25px] font-medium  border-r-[0.25px] ">
        Rating
      </li>
      <li className="p-2 bg-accentYellow border-b-[0.25px] font-medium  ">
        Edit
      </li>
      {reviews?.slice(startIndex, endIndex).map((review, i) => (
        <ManageReviewsTableRow
          review={review}
          key={i}
          isLast={i === reviews.length - 1}
        />
      ))}
    </ul>
  );
}

export default ManageReviewsTable;

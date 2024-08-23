function AddReviewBtn({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="p-3 z-40 hover:scale-[1.025] cursor-pointer sticky bottom-10 ml-auto mr-10 mb-10 w-fit  bg-accentYellow/80 rounded-md font-textFont font-extralight "
    >
      <h2 className="font-textFont">Leave us a review</h2>
      <p className="font-normal text-mainGreen/80">
        Let us know about your trip ...
      </p>
    </div>
  );
}

export default AddReviewBtn;

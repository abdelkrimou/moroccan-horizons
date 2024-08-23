function BillingTableRow({ billing, isLast }) {
  return (
    <>
      <li
        className={`p-3 ${
          isLast ? "" : "border-b-[0.25px]"
        } border-r-[0.25px] w-full capitalize border-mainGreen`}
      >
        <span className="w-full h-full block">{billing?._id}</span>
      </li>
      <li
        className={`p-3 ${
          isLast ? "" : "border-b-[0.25px]"
        } border-r-[0.25px] capitalize border-mainGreen`}
      >
        {billing?.nPeople}
      </li>
      <li
        className={`p-3 ${
          isLast ? "" : "border-b-[0.25px]"
        } border-r-[0.25px] font-semibold capitalize border-mainGreen`}
      >
        ${billing?.price}
      </li>
      <li
        className={`p-3 ${
          isLast ? "" : "border-b-[0.25px]"
        }  capitalize border-mainGreen
        `}
      >
        {new Date(billing?.createdAt).toDateString()}
      </li>
    </>
  );
}

export default BillingTableRow;

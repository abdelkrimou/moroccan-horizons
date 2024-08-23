import ManageToursTableRow from "../common/ManageToursTableRow";

function ManageToursTable({ tours }) {
  return (
    <ul className="border-[0.5px] overflow-auto mt-4 divide-mainGreen grid grid-cols-manageToursTable gap-x-[1px]  border-mainGreen text-mainGreen rounded-lg">
      <li className="p-2 bg-accentYellow border-b-[0.25px] font-medium border-r-[0.25px] border-mainGreen">
        Tour
      </li>
      <li className="p-2 bg-accentYellow border-b-[0.25px] font-medium  border-r-[0.25px]">
        Group
      </li>
      <li className="p-2 bg-accentYellow border-b-[0.25px] font-medium  border-r-[0.25px]">
        Guides
      </li>
      <li className="p-2 bg-accentYellow border-b-[0.25px] font-medium  border-r-[0.25px] ">
        Difficulty
      </li>
      <li className="p-2 bg-accentYellow border-b-[0.25px] font-medium  border-r-[0.25px] ">
        Duration
      </li>
      <li className="p-2 bg-accentYellow border-b-[0.25px] font-medium  ">
        Edit
      </li>
      {tours?.map((tour, i) => (
        <ManageToursTableRow
          tour={tour}
          key={i}
          isLast={i === tours.length - 1}
        />
      ))}
    </ul>
  );
}

export default ManageToursTable;

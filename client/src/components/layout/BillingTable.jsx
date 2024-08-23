import React from "react";
import BillingTableRow from "../common/BillingTableRow";

function BillingTable({ billings }) {
  return (
    <ul className="border-[0.5px] overflow-hidden mt-4 divide-mainGreen grid grid-cols-billingTable gap-x-[1px]  border-mainGreen text-mainGreen rounded-lg">
      <li className="p-2 bg-accentYellow border-b-[0.25px] font-medium border-r-[0.25px] border-mainGreen">
        Billing Id
      </li>
      <li className="p-2 bg-accentYellow border-b-[0.25px] font-medium  border-r-[0.25px]">
        n.People
      </li>
      <li className="p-2 bg-accentYellow border-b-[0.25px] font-medium  border-r-[0.25px]">
        Total Price
      </li>
      <li className="p-2 bg-accentYellow border-b-[0.25px] font-medium  ">
        Purchase Date
      </li>
      {billings.map((billing, i) => (
        <BillingTableRow
          billing={billing}
          key={i}
          isLast={i === billings.length - 1}
        />
      ))}
    </ul>
  );
}

export default BillingTable;

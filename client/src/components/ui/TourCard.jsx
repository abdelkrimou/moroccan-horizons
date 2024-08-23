import { IoLocationOutline } from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { CiFlag1 } from "react-icons/ci";
import { FaPeopleGroup } from "react-icons/fa6";
import { Link } from "react-router-dom";
import PrimaryBtn from "../ui/PrimaryBtn";

function TourCard({ tour }) {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg hover:scale-[1.025] transition-all duration-300 ease-in-out group ">
      <div className="relative overflow-hidden group-hover:scale-[1.025] transition-all duration-300 ease-in-out ">
        <div className="bg-mainYellow/20  z-10 inset-0 absolute"></div>
        <img
          className=" w-full h-[300px] object-cover  relative z-0 "
          src={`/tours/${tour.imageCover}`}
          alt={tour.name}
        />
        <p className="z-30 absolute bottom-3  right-3 font-medium text-mainGreen/70 text-[30px] uppercase font-mainFont">
          <span className="bg-mainYellow/90  block p-2 ml-auto w-fit">
            {tour.name.split(" ")[0]} {tour.name.split(" ")[1]}
          </span>
          <span className="mt-[-10px] ml-auto text-end block p-2 bg-mainYellow/90 w-fit">
            {tour.name.split(" ")[2]} {tour?.name?.split(" ")[3]}
          </span>
          {tour?.name?.split(" ")[4] && (
            <span className="mt-[-10px] ml-auto text-end block p-2 bg-mainYellow/90 w-fit">
              {tour?.name?.split(" ")[4]}
            </span>
          )}
        </p>
        <p className="bg-white absolute z-20 h-[60px] w-full bottom-[-40px] -skew-y-3 "></p>
      </div>
      <div className="bg-white p-5 relative z-50 font-textFont">
        <p className="uppercase font-semibold font-mainFont text-mainGreen/70 mb-4">
          {tour.difficulty} | {tour.duration}-day Tour
        </p>
        <p className="text-sm  text-gray-500 font-light font-headFont ">
          {tour.summary}
        </p>
        <div className="flex flex-wrap gap-y-3 py-3 px-1 mt-3">
          <div className="w-1/2">
            <IoLocationOutline className="inline-block mr-3 text-mainYellow text-[22px]" />{" "}
            <span className="text-mainGreen text-sm font-light">
              {tour.startLocation.description}
            </span>
          </div>
          <div className="w-1/2">
            <CiCalendar className="inline-block mr-3 text-mainYellow text-[22px]" />{" "}
            <span className="text-mainGreen text-sm font-light">
              {new Date(tour.startDates[0]).toLocaleString("default", {
                month: "long",
              })}{" "}
              {new Date(tour.startDates[0]).getFullYear()}
            </span>
          </div>
          <div className="w-1/2">
            <CiFlag1 className="inline-block mr-3 text-mainYellow text-[22px]" />{" "}
            <span className="text-mainGreen text-sm font-light">
              {tour.locations.length} Stops
            </span>
          </div>
          <div className="w-1/2">
            <FaPeopleGroup className="inline-block mr-3 text-mainYellow text-[22px]" />{" "}
            <span className="text-mainGreen text-sm font-light">
              {tour.maxGroupSize} people
            </span>
          </div>
        </div>
      </div>
      <div className="bg-gray-100/30 p-6 flex justify-between text-sm font-extralight text-mainGreen items-center">
        <div>
          <div>
            <span className="font-semibold mr-1">${tour.price}</span> Per person
          </div>
          <div>
            <span className="font-semibold mr-1">${tour.ratingsAverage}</span>{" "}
            Ratings ({tour.ratingsQuantity})
          </div>
        </div>
        <Link to={tour.nameSlug}>
          <PrimaryBtn>Details</PrimaryBtn>
        </Link>
      </div>
    </div>
  );
}

export default TourCard;

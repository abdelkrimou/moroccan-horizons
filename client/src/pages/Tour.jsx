import Container from "../components/layout/Container";
import { FaRegClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineCalendarToday } from "react-icons/md";
import { LuArrowUpWideNarrow } from "react-icons/lu";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdStarRate } from "react-icons/md";
import ReviewCard from "../components/ui/ReviewCard";
import PrimaryBtn from "../components/ui/PrimaryBtn";
import MapComponent from "../components/common/MapComponent";
import BookingModal from "./BookingModal";
import { UseModalsContext } from "../Context/ModalsContext";
import AddReviewBtn from "../components/common/AddReviewBtn";
import AddReviewModal from "./AddReviewModal";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { fetchTour } from "../services/tours/FetchTour";
import LoadingPage from "../components/common/LoadingPage";
import { useAuth } from "../services/auth/IsLoggedIn";
import ErrorPage from "../components/ui/ErrorPage";
function Tour() {
  const params = useParams();
  const nameSlug = params.nameSlug;

  const {
    isLoading,
    error,
    data: tour,
  } = useQuery({
    queryKey: ["Tour", nameSlug],
    queryFn: () => fetchTour(nameSlug),
  });
  const { user, isAuthenticated } = useAuth();
  const {
    isBookingModalOpen,
    setIsBookingModalOpen,
    setIsAddReviewModalOpen,
    isAddReviewModalOpen,
  } = UseModalsContext();

  const coordinates = tour?.locations?.map((location) => ({
    longitude: location.coordinates[0],
    latitude: location.coordinates[1],
  }));
  useEffect(() => {
    setIsBookingModalOpen(false);
    setIsAddReviewModalOpen(false);
  }, [setIsAddReviewModalOpen, setIsBookingModalOpen]);
  if (isLoading) return <LoadingPage />;
  if (error) return <ErrorPage />;
  return (
    <div className="md:mt-6 mt-4 relative ">
      <Container>
        <div className="header-tour relative max-h-[500px] h-[500px] overflow-hidden rounded-t-lg ">
          <img
            className="blur-[1px] h-full w-full object-cover  "
            src={`/tours/${tour?.imageCover}`}
            alt="tour name"
          />

          <div className="overlay absolute z-30 bg-accentGreen/30 inset-0 "></div>
          <div className="absolute translate-x-[-50%] top-1/2 left-1/2 translate-y-[-50%] w-fit z-40 ">
            <h2 className="text-center max-w-[500px]  text-[50px] uppercase font-mainFont font-bold text-white drop-shadow-xl">
              <span className=" p-3 leading-[5px]  box-decoration-clone bg-accentGreen/70">
                {tour?.name}
              </span>
            </h2>
            <div className="flex font-mainFont gap-6 divide-x-[0.5px] divide-white bg-gray-50/30  text-white drop-shadow-lg  w-fit m-auto mt-10">
              <p className="flex p-2 items-center gap-3">
                <FaRegClock className="text-2xl text-white" />{" "}
                <span className="uppercase font-bold drop-shadow-2xl">
                  {tour?.duration} Days
                </span>
              </p>
              <p className="flex items-center p-2 gap-3">
                <FaLocationDot className="text-2xl text-white" />{" "}
                <span className="uppercase font-bold drop-shadow-2xl">
                  {tour?.startLocation?.description}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="tour-infos flex flex-col  lg:flex-row">
          <div className="info-guides-tour lg:gap-x-10 py-20 gap-y-10 p-10 flex w-full flex-wrap lg:w-1/2  flex-row font-textFont lg:flex-col bg-gray-100">
            <div className="lg:w-[400px] lg:m-auto md:w-1/2 w-full ">
              <h3 className="uppercase mb-8 text-xl font-bold text-accentGreen ">
                Quick facts
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-10">
                  <p className="flex items-center gap-3">
                    <MdOutlineCalendarToday className="text-2xl text-accentGreen" />
                    <span className="text-gray-500 uppercase font-semibold text-md">
                      Next Date
                    </span>
                  </p>
                  <p className="font-light font-textFont ">
                    {new Date(tour?.startDates[0]).toDateString()}
                  </p>
                </li>
                <li className="flex items-center gap-10">
                  <p className="flex items-center gap-3">
                    <LuArrowUpWideNarrow className="text-2xl text-accentGreen" />
                    <span className="text-gray-500 uppercase font-semibold text-md">
                      Difficulty
                    </span>
                  </p>
                  <p className="font-light font-textFont ">
                    {tour?.difficulty}
                  </p>
                </li>
                <li className="flex items-center gap-10">
                  <p className="flex items-center gap-3">
                    <FaPeopleGroup className="text-2xl text-accentGreen" />
                    <span className="text-gray-500 uppercase font-semibold text-md">
                      participants
                    </span>
                  </p>
                  <p className="font-light font-textFont ">
                    {tour?.maxGroupSize} people
                  </p>
                </li>
                <li className="flex items-center gap-10">
                  <p className="flex items-center gap-3">
                    <MdStarRate className="text-2xl text-accentGreen" />
                    <span className="text-gray-500 uppercase font-semibold text-md">
                      rating
                    </span>
                  </p>
                  <p className="font-light font-textFont ">
                    {tour?.ratingsAverage} / 5
                  </p>
                </li>
              </ul>
            </div>
            <div className="lg:w-[400px] lg:m-auto md:w-1/2 w-full ">
              <h3 className="uppercase mb-8 text-xl font-bold text-accentGreen ">
                tour guides
              </h3>

              <ul className="space-y-4">
                {tour?.guides?.map((guide, i) => (
                  <li key={i} className="flex items-center gap-5">
                    <p className="flex items-center gap-2">
                      <img
                        className="w-[50px] h-[50px] rounded-full"
                        src={`/user-images/${guide?.photo}`}
                        alt="guide"
                      />
                      <span className="text-gray-600/80 uppercase ml-3 font-semibold text-md">
                        {guide?.role?.split("-").join(" ")}
                      </span>
                    </p>
                    <p className="font-light font-mainFont ">{guide?.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="info-desc bg-gray-100/20 p-3 w-full lg:w-1/2 flex justify-center py-10 px-4 flex-col items-center">
            <h3 className="text-2xl tracking-wider mb-4 lg:max-w-[400px] text-center lg:text-start text-mainGreen uppercase font-textFont font-bold">
              About {tour?.name}
            </h3>
            <p className="first-letter:text-2xl leading-8 lg:max-w-[400px] text-center lg:text-start font-textFont font-light text-gray-400">
              {tour?.description}
            </p>
          </div>
        </div>
        <div className="relative z-40 imgs grid grid-cols-2 lg:grid-cols-3 opacity-90">
          <img
            src={`/tours/${tour?.images[0]}`}
            alt="-1"
            className="object-cover object-bottom transition-all duration-300 ease-in-out h-[250px] w-full opacity-90 hover:opacity-100 hover:scale-[1.05] hover:z-50"
          />
          <img
            src={`/tours/${tour?.images[1]}`}
            alt="-2"
            className="object-cover transition-all duration-300 ease-in-out h-[250px] hidden opacity-90 hover:opacity-100 hover:scale-[1.05] hover:z-50 lg:block w-full"
          />
          <img
            src={`/tours/${tour?.images[2]}`}
            alt="-3"
            className="object-cover transition-all duration-300 ease-in-out h-[250px] hover:opacity-100 hover:scale-[1.05] hover:z-50 opacity-90 w-full "
          />
        </div>
        <div className="relative z-30">
          <MapComponent coordinates={coordinates} />
        </div>
        {/* /reviews */}
        <div className="reviews flex gap-8 overflow-auto py-14">
          {tour?.reviews?.map((review, i) => (
            <ReviewCard
              reviewText={review?.review}
              key={i}
              rating={review?.rating}
              userName={review?.user?.name}
              userPhoto={review?.user?.photo}
            />
          ))}
        </div>
        <div className="booking-btn my-12 gap-x-2 gap-y-6 max-w-[1000px] m-auto overflow-hidden rounded-2xl justify-between items-center flex flex-col lg:flex-row bg-accentYellow/30 py-10 px-4 lg:text-start text-center">
          <div className="relative mb-3 w-[260px] lg:ml-[-70px]  h-[130px]">
            <img
              className="w-[130px]  shadow-xl absolute top-0 left-0 z-40 h-[130px] object-top rounded-full"
              src={`/tours/${tour?.imageCover}`}
              alt="logo-bg"
            />
            <img
              className="w-[130px] shadow-xl absolute top-0 left-10 z-30 h-[130px] rounded-full"
              src={`/tours/${tour?.images[0]}`}
              alt="1"
            />
            <img
              className="w-[130px] shadow-xl  absolute top-0 left-20 z-20 h-[130px] rounded-full"
              src={`/tours/${tour?.images[1]}`}
              alt="2"
            />
            <img
              className="w-[130px] shadow-xl  absolute top-0 left-28 z-10 h-[130px] rounded-full"
              src={`/tours/${tour?.images[2]}`}
              alt="3"
            />
          </div>
          <div>
            <h2 className="text-xl uppercase mb-3 font-bold text-accentGreen font-textFont">
              What are you waiting for ?
            </h2>
            <p className="font-textFont font-light text-lg">
              {tour?.duration} days. 1 adventure. Infinite memories. Make it
              yours today!
            </p>
          </div>
          <div>
            {isAuthenticated ? (
              <PrimaryBtn onClick={() => setIsBookingModalOpen(true)}>
                book the tour
              </PrimaryBtn>
            ) : (
              <Link to="/login">
                <PrimaryBtn>Login to book the tour</PrimaryBtn>
              </Link>
            )}
          </div>
        </div>
      </Container>
      {isBookingModalOpen && <BookingModal tour={tour} user={user} />}
      {isAddReviewModalOpen && <AddReviewModal tour={tour} />}
      <AddReviewBtn onClick={() => setIsAddReviewModalOpen(true)} />
    </div>
  );
}

export default Tour;

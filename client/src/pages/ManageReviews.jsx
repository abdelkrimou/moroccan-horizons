import { useQuery } from "@tanstack/react-query";
import { IoSearch } from "react-icons/io5";

import Pagination from "../components/common/Pagination";
import { getAllReviews } from "../services/reviews/getAllReviews";
import ManageReviewsTable from "../components/layout/ManageReviewsTable";
import LoadingPage from "../components/common/LoadingPage";
import { fetchTours } from "../services/tours/FetchTours";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorPage from "../components/ui/ErrorPage";
function ManageReviews() {
  const [reviews, setReviews] = useState();
  const [filterTour, setFilterTour] = useState("all-tours");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState("default");

  // Get Current page
  const itemsPerPage = 10;
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = queryParams.get("page") || "1";
  // set the start and end indexes
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // Fetchign Data
  const { isLoading, error, data } = useQuery({
    queryKey: ["AllReviews"],
    queryFn: getAllReviews,
  });

  console.log(reviews?.length);
  const { data: tours } = useQuery({
    queryKey: ["tours"],
    queryFn: fetchTours,
  });
  // sorting
  function handleSorting(e) {
    navigate(`${location.pathname}?${"page=1"}`);

    if (e.target.value === "low-rate") {
      setReviews(() => reviews.sort((a, b) => a.rating - b.rating));
    } else if (e.target.value === "top-rate") {
      setReviews(() => reviews.sort((a, b) => b.rating - a.rating));
    }
  }
  // Filtering
  function handleFiltering(e) {
    navigate(`${location.pathname}?${"page=1"}`);

    setSearchQuery("");
    let filterValue = e.target.value;
    if (filterValue === "all-tours") {
      const sortedReview =
        sortType === "top-rate"
          ? data.sort((a, b) => b.rating - a.rating)
          : sortType === "low-rate"
          ? data.sort((a, b) => a.rating - b.rating)
          : data;
      return setReviews(sortedReview);
    }
    const filterdReviews = data.filter((rev) => rev.tour.name === filterValue);
    const sortedReview =
      sortType === "top-rate"
        ? filterdReviews.sort((a, b) => b.rating - a.rating)
        : sortType === "low-rate"
        ? filterdReviews.sort((a, b) => a.rating - b.rating)
        : filterdReviews;
    setReviews(sortedReview);
  }
  // handle Search bar
  function handleSearch(e) {
    navigate(`${location.pathname}?${"page=1"}`);
    setFilterTour("all-tours");
    setSortType("default");
    let searchQuery = e.target.value;
    if (searchQuery.trim() === "") return setReviews(data);
    // setFilterRole("all-roles");
    // let searchInput = e.target.value;
    setReviews(() =>
      data.filter((review) =>
        review.user.name
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase())
      )
    );
  }
  //
  useEffect(() => {
    setReviews(data);
  }, [data]);
  if (isLoading) return <LoadingPage />;
  if (error) return <ErrorPage />;
  return (
    <div className="m-auto min-h-[600px] max-w-[900px]">
      <div className="flex gap-4 flex-wrap items-center border-[0.25px] rounded-lg p-2">
        <div className="flex gap-4 items-center">
          <h2 className="underline">Filtering:</h2>
          <select
            onChange={(e) => {
              handleFiltering(e);
              setFilterTour(e.target.value);
            }}
            value={filterTour}
            className="bg-accentYellow/50 focus:ring-[1px] focus:outline-none ring-accentGreen capitalize border-mainGreen border-[0.25px] rounded-lg p-2"
          >
            <option value="all-tours">All tours</option>
            {tours.map((tour, i) => (
              <option key={i} value={tour?.name}>
                {tour?.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-4 items-center">
          <h2 className="underline">Sorting:</h2>

          <select
            onChange={(e) => {
              setSortType(e.target.value);
              handleSorting(e);
            }}
            value={sortType}
            className="bg-accentYellow/50 focus:ring-[1px] focus:outline-none ring-accentGreen capitalize border-mainGreen border-[0.25px] rounded-lg p-2"
          >
            <option value="default">By Rating:</option>
            <option value="top-rate">Top rating</option>
            <option value="low-rate">low rating</option>
          </select>
        </div>
        <div className=" flex-1 min-w-[250px] w-full relative ml-auto">
          <label
            htmlFor="user-name"
            className="cursor-pointer absolute right-2 translate-y-[50%] top-0 text-xl"
          >
            <IoSearch />
          </label>
          <input
            value={searchQuery}
            onChange={(e) => {
              handleSearch(e);
              setSearchQuery(e.target.value);
            }}
            id="user-name"
            type="text"
            placeholder="Enter the name of reviewer"
            className="p-2 w-full bg-accentGreen/20 rounded-lg focus:outline-none focus:ring-[1px] pl-4 ring-mainGreen placeholder:text-mainGreen placeholder:capitalize text-mainGreen"
          />
        </div>
      </div>
      {reviews?.length === 0 ? (
        <div className="text-mainGreen text-lg text-center mt-5">
          Opps! This tour has no reviews yet !!
        </div>
      ) : (
        <>
          <ManageReviewsTable
            reviews={reviews}
            startIndex={startIndex}
            endIndex={endIndex}
          />
          <Pagination data={reviews} />
        </>
      )}
    </div>
  );
}

export default ManageReviews;

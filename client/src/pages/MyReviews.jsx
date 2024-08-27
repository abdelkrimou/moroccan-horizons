import React from "react";
import ReviewTable from "../components/layout/ReviewTable";
import { useQuery } from "@tanstack/react-query";
import { getMyReviews } from "../services/reviews/HandleMyReviews";
import { useAuth } from "../services/auth/IsLoggedIn";
import LoadingPage from "../components/common/LoadingPage";
import ErrorPage from "../components/ui/ErrorPage";

function MyReviews() {
  const { user } = useAuth();
  const userId = user?._id;
  const {
    isLoading,
    data: reviews,
    error,
  } = useQuery({
    queryKey: ["user-review"],
    queryFn: () => getMyReviews({ userId }),
  });

  if (isLoading) {
    return <LoadingPage />;
  }
  if (error) {
    return <ErrorPage />;
  }
  return (
    <>
      {reviews?.length ? (
        <div className="m-auto min-h-[600px] max-w-[800px]">
          <ReviewTable reviews={reviews} />
        </div>
      ) : (
        <div className="text-xl font-textFont mt-20 text-mainGreen text-center ">
          Oops ! You have not created any reviews yet
        </div>
      )}
    </>
  );
}

export default MyReviews;

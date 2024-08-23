import { useQuery } from "@tanstack/react-query";
import ManageToursTable from "../components/layout/ManageToursTable";
import LoadingPage from "../components/common/LoadingPage";
import { fetchTours } from "../services/tours/FetchTours";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ErrorPage from "../components/ui/ErrorPage";

function ManageTours() {
  const [tours, setTours] = useState([]);
  const { isLoading, error, data } = useQuery({
    queryKey: ["tours"],
    queryFn: fetchTours,
  });
  useEffect(() => {
    setTours(data);
  }, [data]);

  if (isLoading) return <LoadingPage />;
  if (error) return <ErrorPage />;
  return (
    <div className="m-auto min-h-[600px] max-w-[900px]">
      <div className="flex gap-3  flex-wrap items-center border-[0.25px] rounded-lg p-2">
        <Link
          to={"/tours/create-new"}
          className=" font-textFont text-center  min-w-[200px] ml-auto md:flex-0 flex-1 bg-mainGreen/80 py-2 hover:bg-mainGreen/90 text-white rounded-md px-3"
        >
          Create Tour
        </Link>
      </div>

      {tours?.length === 0 ? (
        <div className="font-textFont text-center text-xl mt-8 text-mainGreen ">
          Oops ! There is no tours ☹️
        </div>
      ) : (
        <ManageToursTable tours={tours} />
      )}
    </div>
  );
}

export default ManageTours;

import TourCard from "../components/ui/TourCard";
import Container from "../components/layout/Container";
import { useQuery } from "@tanstack/react-query";
import { fetchTours } from "../services/tours/FetchTours";
import LoadingPage from "../components/common/LoadingPage";
import ErrorPage from "../components/ui/ErrorPage";
import { useEffect, useState } from "react";

function Homepage() {
  const [tours, setTours] = useState();
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
    <div className="bg-gray-100/40 py-10">
      <Container>
        <div className="grid grid-cols-tourGrid gap-20  p-6">
          {tours?.map((tour, i) => (
            <TourCard key={i} tour={tour} />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Homepage;

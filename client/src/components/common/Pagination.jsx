import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
function Pagination({ data }) {
  const navigate = useNavigate();
  const location = useLocation();
  // Maximum lists or rows in one table
  const maxLists = 10;
  // Reading the queries from url
  const queryParams = new URLSearchParams(location.search);
  // get or set the current Page to 1 if there was no page query
  const currentPage = queryParams.get("page") || "1";
  // Set the number of pages , depends on how element we have in data and how many rows per table we want
  const pagesNum = Math.ceil(data?.length / maxLists);

  // handle Page change
  const handlePageClick = (page) => {
    queryParams.set("page", page.toString());
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);
  return (
    <div
      className={`${
        pagesNum === 1 ? "hidden" : "block"
      } flex  items-center mt-10 text-mainGreen max-w-[600px] m-auto justify-between p-3 capitalize font-mainFont`}
    >
      <span
        onClick={() => handlePageClick(+currentPage - 1)}
        className={`${
          +currentPage === 1 ? "invisible" : "visible"
        }  opacity-50  hover:animate-pulse hover:opacity-100 cursor-pointer`}
      >
        <GoArrowLeft className="inline-block mr-2" />
        prev
      </span>
      <ul className="flex justify-center flex-wrap items-center gap-4">
        {Array.from({ length: pagesNum }, (_, i) => (
          <li
            onClick={() => handlePageClick(i + 1)}
            key={i}
            className={`${
              i + 1 === +currentPage ? "underline" : "opacity-20"
            } cursor-pointer hover:scale-[1.2] hover:opacity-60 p-2`}
          >
            {i + 1}
          </li>
        ))}
      </ul>
      <span
        onClick={() => handlePageClick(+currentPage + 1)}
        className={`${
          pagesNum === +currentPage ? "invisible" : "visible"
        } opacity-50 hover:animate-pulse hover:opacity-100 cursor-pointer`}
      >
        next <GoArrowRight className="inline-block ml-2" />
      </span>
    </div>
  );
}

export default Pagination;

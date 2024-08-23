import { Link } from "react-router-dom";

function HeadingHome() {
  return (
    <Link to="/">
      <h1 className="flex w-fit tracking-wider hover:scale-[1.025] transition-all duration-150 ease-in-out items-center font-mainFont uppercase text-mainGreen  px-4">
        - Moroccan horizons -{" "}
      </h1>
    </Link>
  );
}

export default HeadingHome;

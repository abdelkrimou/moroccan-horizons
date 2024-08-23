import { Link } from "react-router-dom";

function Logo() {
  return (
    <div className=" m-auto">
      <Link to="/">
        <img className="w-[60px]" src="/logo.png" alt="logo " />
      </Link>
    </div>
  );
}

export default Logo;

import { Link } from "react-router-dom";
function ErrorPage() {
  return (
    <div className="font-textFont text-mainGreen text-center  mt-10">
      <p className="text-lg">
        Oops ! There is an issue with requesting this page
      </p>

      <span className="block mb-8">try again later!!!</span>
      <Link className="text-accentGreen" to="/">
        Go to HomePage{" "}
      </Link>
    </div>
  );
}

export default ErrorPage;

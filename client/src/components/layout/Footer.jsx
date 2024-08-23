import { Link } from "react-router-dom";
import HeadingHome from "../common/HeadingHome";
import Logo from "../ui/Logo";
import Container from "./Container";

const footerLists = [
  { name: "About us", to: "/about-us" },
  { name: "download app", to: "/download-app" },
  { name: "become a tour guide", to: "/apply-cv" },

  { name: "contact", to: "/contact" },
];

function Footer() {
  return (
    <footer className="w-full bg-accentGreen/10 border-t-mainGreen border-[0.5px]">
      <Container>
        <div className="py-8 px-4 flex flex-col gap-4 xl:flex-row justify-between items-center">
          <div className="flex gap-2 items-center">
            <Logo />
            <HeadingHome />
          </div>
          <div>
            <ul className="flex flex-col md:flex-row gap-2  md:divide-x-[1px] divide-mainGreen items-center ">
              {footerLists.map((list, i) => (
                <Link key={i} to={list.to}>
                  <li className="font-textFont text-[14px] uppercase hover:underline lg:px-6 md:px-4 px-2 font-light hover:text-mainGreen/50  text-mainGreen">
                    {list.name}
                  </li>
                </Link>
              ))}
            </ul>
            <p className="text-sm mt-4 px-6 font-extralight text-center xl:text-end text-black font-mainFont">
              © {new Date().getFullYear()} by Abdelkrim Ouaaddi.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;

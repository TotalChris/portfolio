import { Link, useLocation } from "react-router";
import "../styles/Navbar.css";
import { BsGithub } from "react-icons/bs";

const Navbar = () => {
  const location = useLocation();

  return (
    <div
      className="fixed top-0 z-10 bg-white dark:bg-black w-full"
      style={{ maxWidth: "100vw" }}
    >
      <nav className="h-8 flex mx-2 sm:mx-4 lg:mx-8 mt-6 text-black dark:text-white gap-2 text-md">
        <Link
          viewTransition
          to="/"
          className={`navbar-link font-bold  ${location.pathname === "/" && "current"}`}
        >
          Chris Yates
        </Link>
        <Link
          viewTransition
          to="/resume"
          className={`navbar-link ${location.pathname === "/resume" && "current"}`}
        >
          Resume
        </Link>
        <Link
          viewTransition
          to="/contact"
          className={`navbar-link ${location.pathname === "/contact" && "current"}`}
        >
          Contact
        </Link>
        <a
          href="https://github.com/totalchris/"
          className={`navbar-link endcap ${location.pathname === "#" && "current"}`}
        >
          <BsGithub />
        </a>
      </nav>
    </div>
  );
};
export default Navbar;

import logo from "../assets/img/logo/logo-light-mode.png";

import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className=" bg-gray-100 px-4 py-5">
      <div className="flex justify-between items-center container mx-auto">
        <Link to="/">
          <img src={logo} alt="Beepbob Logo" className="w-36 lg:w-40 h-full" />
        </Link>
        <div className="flex justify-end items-center gap-5 md:gap-6">
          <Link to="/" className=" font-medium first-letter hidden sm:block">
            Write
          </Link>
          <Link
            to="/login"
            className=" font-medium first-letter hidden sm:block"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="py-1 px-3 bg-lime-300 text-black duration-200 rounded-md leading-normal font-bold hover:bg-black hover:text-lime-300"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

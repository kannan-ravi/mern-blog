import logo from "../assets/img/BeepBob-black-text.png";

import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="p-6 bg-yellow-400">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <img src={logo} alt="Beepbob Logo" className="w-20 h-full lg:w-32" />
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
            className="border-2 border-black  px-4 bg-black text-white  duration-200 py-2 rounded-full"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
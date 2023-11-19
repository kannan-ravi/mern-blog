import logo from "../assets/img/logo/logo-light-mode.png";
import { allUserSlice } from "../app/features/UserSlice";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { currentUser } = useSelector(allUserSlice);

  const headerUserLogic = currentUser ? (
    <img
      src={currentUser.profilePicture}
      alt={currentUser.username}
      className="w-10 h-10 rounded-full object-cover"
    />
  ) : (
    <div className="flex gap-5 md:gap-6 justify-end items-center">
      <Link to="/login" className=" font-medium first-letter hidden sm:block">
        Login
      </Link>
      <Link
        to="/register"
        className="py-1 px-3 bg-lime-300 text-black duration-200 rounded-md leading-normal font-bold hover:bg-black hover:text-lime-300"
      >
        Get Started
      </Link>
    </div>
  );
  return (
    <header className=" bg-gray-100 px-4 py-5">
      <div className="flex justify-between items-center container mx-auto">
        <Link to="/">
          <img src={logo} alt="Beepbob Logo" className="w-36 lg:w-40 h-full" />
        </Link>
        <div className="flex justify-end items-center gap-5 md:gap-6">
          <Link
            to={currentUser ? "/" : "/register"}
            className=" font-medium first-letter hidden sm:block"
          >
            Write
          </Link>
          {headerUserLogic}
        </div>
      </div>
    </header>
  );
};

export default Header;

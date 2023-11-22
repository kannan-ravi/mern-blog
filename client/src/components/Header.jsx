import logo from "../assets/img/logo/logo-light-mode.png";
import api from "../api/axios";
import { allUserSlice } from "../app/features/UserSlice";
import { signOut } from "../app/features/UserSlice";

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useCallback, useEffect } from "react";

const Header = () => {
  const { currentUser } = useSelector(allUserSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dropDown, setDropDown] = useState(false);
  const dropdownRef = useRef(null);

  const closeOpenMenus = (e) => {
    if (
      dropdownRef.current &&
      dropDown &&
      !dropdownRef.current.contains(e.target)
    ) {
      setDropDown(false);
    }
  };

  const handleLogout = async () => {
    try {
      await api.get("/auth/logout");
      dispatch(signOut());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeOpenMenus);
    return () => {
      document.removeEventListener("mousedown", closeOpenMenus);
    };
  });

  const headerUserLogic = currentUser ? (
    <div className="relative flex items-center space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
      <button
        type="button"
        className="flex text-sm rounded-full md:me-0 focus:ring-4 focus:ring-gray-300"
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="w-8 h-8 border border-white rounded-full"
          src={currentUser.profilePicture}
          alt={`${currentUser.username} photo`}
          onClick={() => setDropDown(true)}
        />
      </button>
      {dropDown && (
        <div
          className="absolute z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow top-5 right-5 "
          id="user-dropdown"
          ref={dropdownRef}
        >
          <div className="px-4 py-3">
            <span className="block text-sm text-gray-900 ">
              {currentUser.username}
            </span>
            <span className="block text-sm text-gray-500 truncate ">
              {currentUser.email}
            </span>
          </div>
          <ul className="py-2" aria-labelledby="user-menu-button">
            <li>
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={(e) => setDropDown(false)}
              >
                Profile
              </Link>
            </li>

            <li>
              <p
                to="/"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  setDropDown(false);
                  handleLogout();
                }}
              >
                Logout
              </p>
            </li>
          </ul>
        </div>
      )}
    </div>
  ) : (
    <Link
      to="/register"
      className="px-3 py-1 space-x-3 font-bold leading-normal text-black duration-200 rounded-md bg-lime-300 hover:bg-black hover:text-lime-300 md:order-2 md:space-x-0 rtl:space-x-reverse"
    >
      Get Started
    </Link>
  );

  return (
    <header>
      <nav className="bg-gray-200 border-gray-200">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={logo} className="h-8" alt="Flowbite Logo" />
          </Link>
          {headerUserLogic}
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-user"
          >
            <ul className="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg md:p-0 md:space-x-8 md:flex-row md:mt-0 md:border-0">
              <li>
                <Link
                  to="/"
                  className="px-3 py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="px-3 py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="px-3 py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

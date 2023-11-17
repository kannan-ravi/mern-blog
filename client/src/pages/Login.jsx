import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

import { useDispatch, useSelector } from "react-redux";
import { authFailure, authStart, authSuccess } from "../redux/slices/UserSlice";

const Login = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const { loading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(authStart());
      const loginResponse = await api.post("/auth/login", formData);
      dispatch(authSuccess(loginResponse.data));
      navigate("/");
    } catch (error) {
      dispatch(authFailure(error.response.data.message));
    }
  };

  return (
    <section className="container mx-auto mt-10 lg:mt-12 p-4 h-full">
      <h1 className="text-3xl text-center font-bold leading-snug">
        Welcome Back!
      </h1>
      <form
        className="mt-9 lg:mt-11 flex flex-col gap-5 max-w-xl  mx-auto"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="px-3 py-2 border rounded w-full"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="px-3 py-2 border rounded w-full"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="px-3 py-2 uppercase bg-black rounded text-lime-300 mt-4 font-bold duration-200 hover:bg-lime-300 hover:text-black"
        >
          {loading ? "loading..." : "login"}
        </button>
      </form>
      <p className="text-red-800 max-w-xl mx-auto mt-2">{error && error}</p>
      <p className="max-w-xl  mx-auto mt-2">
        Don't have an account{" "}
        <Link to="/register" className="text-blue-600 font-semibold underline">
          Register
        </Link>
      </p>
    </section>
  );
};

export default Login;

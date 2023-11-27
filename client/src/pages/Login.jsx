import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

import { useDispatch, useSelector } from "react-redux";
import {
  allUserSlice,
  authFailure,
  authStart,
  authSuccess,
} from "../app/features/UserSlice";

const Login = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(allUserSlice);

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
    } catch (err) {
      dispatch(authFailure(err.response.data.message));
      console.log(error);
    }
  };

  return (
    <section className="container h-full p-4 mx-auto mt-10 lg:mt-12">
      <h1 className="text-3xl font-bold leading-snug text-center">
        Welcome Back!
      </h1>
      <form
        className="flex flex-col max-w-xl gap-5 mx-auto mt-9 lg:mt-11"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="w-full px-3 py-2 border rounded"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="w-full px-3 py-2 border rounded"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="px-3 py-2 mt-4 font-bold uppercase duration-200 bg-black rounded text-lime-300 hover:bg-lime-300 hover:text-black"
        >
          {loading ? "loading..." : "login"}
        </button>
      </form>
      <p className="max-w-xl mx-auto mt-2 text-red-800">{error && error}</p>
      <p className="max-w-xl mx-auto mt-2">
        Don't have an account{" "}
        <Link to="/register" className="font-semibold text-blue-600 underline">
          Register
        </Link>
      </p>
    </section>
  );
};

export default Login;

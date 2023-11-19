import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  authStart,
  authFailure,
  authSuccess,
  allUserSlice,
} from "../app/features/UserSlice";
import api from "../api/axios";

const Register = () => {
  const [formData, setFormData] = useState({});
  const [isConfirmPassword, setIsConfirmPassword] = useState(true);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector(allUserSlice);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData["password"] !== formData["confirmPassword"]) {
      setIsConfirmPassword(false);
    } else {
      setIsConfirmPassword(true);
      try {
        dispatch(authStart());
        const { confirmPassword, ...registerData } = formData;
        const registerResponse = await api.post("auth/register", registerData);
        dispatch(authSuccess(registerResponse.data));
        navigate("/login");
      } catch (err) {
        dispatch(authFailure(err.response.data.message));
      }
    }
  };

  return (
    <section className="container mx-auto mt-10 lg:mt-12 p-4 h-full">
      <h1 className="text-3xl text-center font-bold leading-snug">
        Welcome to BeepBob!
      </h1>
      <form
        className="mt-9 lg:mt-11 flex flex-col gap-5 max-w-xl  mx-auto"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Username"
          name="username"
          className="px-3 py-2 border rounded w-full"
          onChange={handleChange}
          required
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          className="px-3 py-2 border rounded w-full"
          onChange={handleChange}
          required
        />
        <p className="text-red-800 text-xs">
          {!isConfirmPassword && "Password not matched"}
        </p>
        <button
          type="submit"
          className="px-3 py-2 uppercase bg-black rounded text-lime-300 mt-0 font-bold duration-200 hover:bg-lime-300 hover:text-black"
        >
          {loading ? "loading..." : "register"}
        </button>
      </form>
      <p className="text-red-800 text-xs max-w-xl mx-auto mt-2">
        {error && "Something Went Wrong"}
      </p>
      <p className="max-w-xl  mx-auto mt-2">
        Already have an account{" "}
        <Link to="/login" className="text-blue-600 font-semibold underline">
          Login
        </Link>
      </p>
    </section>
  );
};

export default Register;

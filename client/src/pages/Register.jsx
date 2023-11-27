import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  authStart,
  authFailure,
  allUserSlice,
  authSuccess,
  registerSuccess,
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
        dispatch(registerSuccess());
        navigate("/login");
      } catch (err) {
        dispatch(authFailure(err.response.data.message));
      }
    }
  };

  return (
    <section className="container h-full p-4 mx-auto mt-10 lg:mt-12">
      <h1 className="text-3xl font-bold leading-snug text-center">
        Welcome to BeepBob!
      </h1>
      <form
        className="flex flex-col max-w-xl gap-5 mx-auto mt-9 lg:mt-11"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Username"
          name="username"
          className="w-full px-3 py-2 border rounded"
          onChange={handleChange}
          required
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          className="w-full px-3 py-2 border rounded"
          onChange={handleChange}
          required
        />
        <p className="text-xs text-red-800">
          {!isConfirmPassword && "Password not matched"}
        </p>
        <button
          type="submit"
          className="px-3 py-2 mt-0 font-bold uppercase duration-200 bg-black rounded text-lime-300 hover:bg-lime-300 hover:text-black"
        >
          {loading ? "loading..." : "register"}
        </button>
      </form>
      <p className="max-w-xl mx-auto mt-2 text-xs text-red-800">
        {error && error}
      </p>
      <p className="max-w-xl mx-auto mt-2">
        Already have an account{" "}
        <Link to="/login" className="font-semibold text-blue-600 underline">
          Login
        </Link>
      </p>
    </section>
  );
};

export default Register;

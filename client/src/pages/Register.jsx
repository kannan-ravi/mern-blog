import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";

const Register = () => {
  const [formData, setFormData] = useState({});
  const [isConfirmPassword, setIsConfirmPassword] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

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
        const { confirmPassword, ...registerData } = formData;
        const registerResponse = await api.post("auth/register", registerData);
        navigate("/login");
      } catch (error) {
        setError(true);
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
          className="px-3 py-2 uppercase bg-black rounded text-white mt-0 font-bold"
        >
          register
        </button>
      </form>
      <p className="text-red-800 text-xs max-w-xl mx-auto mt-2">
        {error && "Something went wrong"}
      </p>
      <p className="max-w-xl  mx-auto mt-2">
        Already have an account{" "}
        <Link to="/login" className="text-blue-600 underline">
          Login
        </Link>
      </p>
    </section>
  );
};

export default Register;

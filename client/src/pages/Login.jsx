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
import ErrorComponent from "../components/ui/ErrorComponent";
import InputComponent from "../components/ui/InputComponent";
import ButtonComponent from "../components/ui/ButtonComponent";

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
        <InputComponent
          type={"email"}
          placeholder={"Email"}
          name={"email"}
          onChange={handleChange}
        />
        <InputComponent
          type={"password"}
          placeholder={"Password"}
          name={"password"}
          onChange={handleChange}
        />

        <ButtonComponent
          type="submit"
          isLoading={loading}
          loadingText="loading..."
          buttonText="login"
        />
      </form>
      <ErrorComponent isError={error} message={error} />
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

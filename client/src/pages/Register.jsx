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
import ErrorComponent from "../components/ui/ErrorComponent";
import InputComponent from "../components/ui/InputComponent";
import ButtonComponent from "../components/ui/ButtonComponent";

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
        <InputComponent
          type={"text"}
          placeholder={"Username"}
          onChange={handleChange}
          name={"username"}
        />

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
        <InputComponent
          type={"password"}
          placeholder={"Confirm Password"}
          name={"confirmPassword"}
          onChange={handleChange}
        />

        <ErrorComponent
          isError={!isConfirmPassword}
          message={"Password not matched"}
        />
        <ButtonComponent
          type="submit"
          isLoading={loading}
          loadingText="loading..."
          buttonText="register"
        />
      </form>
      <ErrorComponent isError={error} message={error} />
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

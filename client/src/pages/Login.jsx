import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section className="container mx-auto mt-10 lg:mt-12 p-4 h-full">
      <h1 className="text-3xl text-center font-bold leading-snug">
        Welcome Back!
      </h1>
      <form className="mt-9 lg:mt-11 flex flex-col gap-5 max-w-xl  mx-auto">
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="px-3 py-2 border rounded w-full"
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="px-3 py-2 border rounded w-full"
          required
        />

        <button
          type="submit"
          className="px-3 py-2 uppercase bg-black rounded text-white mt-4 font-bold"
        >
          login
        </button>
      </form>
      <p className="max-w-xl  mx-auto mt-4">
        Don't have an account{" "}
        <Link to="/register" className="text-blue-600 underline">
          register
        </Link>
      </p>
    </section>
  );
};

export default Login;

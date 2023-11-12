import { Link } from "react-router-dom";

const Register = () => {
  return (
    <section className="container mx-auto mt-10 lg:mt-12 p-4 h-full">
      <h1 className="text-3xl text-center font-bold leading-snug">
        Welcome to BeepBob!
      </h1>
      <form className="mt-9 lg:mt-11 flex flex-col gap-5 max-w-xl  mx-auto">
        <input
          type="text"
          placeholder="Username"
          name="username"
          className="px-3 py-2 border rounded w-full"
          required
        />
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
          register
        </button>
      </form>
      <p className="max-w-xl  mx-auto mt-4">
        Already have an account{" "}
        <Link to="/login" className="text-blue-600 underline">
          Login
        </Link>
      </p>
    </section>
  );
};

export default Register;

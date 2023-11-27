import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="py-5 bg-white rounded-lg">
      <div className="container flex flex-col pt-12 mx-auto my-5 bg-white rounded-lg">
        <div className="container flex flex-col items-center gap-16 mx-auto my-32">
          <div className="flex flex-col gap-7">
            <div className="flex flex-col w-10/12 gap-2 px-6 mx-auto text-center">
              <h2 className="text-3xl font-extrabold leading-tight lg:text-4xl text-dark-grey-900">
                Well, shoot! The page you're looking for couldn't be found.
              </h2>
              <p className="text-base font-medium leading-7 text-dark-grey-600">
                We hit a snag... maybe it's time to head back to our main page.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <Link
                to="/"
                className="flex items-center justify-center py-4 font-bold tracking-wide text-gray-800 uppercase transition duration-300 rounded px-7 bg-lime-300 hover:bg-gray-800 hover:text-lime-300 focus:ring-4 focus:ring-purple-blue-100"
              >
                Go back to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

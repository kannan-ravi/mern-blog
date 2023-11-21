import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div class="bg-white rounded-lg py-5">
      <div class="container flex flex-col mx-auto bg-white rounded-lg pt-12 my-5">
        <div class="container flex flex-col items-center gap-16 mx-auto my-32">
          <div class="flex flex-col gap-7">
            <div class="flex flex-col gap-2 px-6 text-center w-10/12 mx-auto">
              <h2 class="text-3xl font-extrabold leading-tight lg:text-4xl text-dark-grey-900">
                Well, shoot! The page you're looking for couldn't be found.
              </h2>
              <p class="text-base font-medium leading-7 text-dark-grey-600">
                We hit a snag... maybe it's time to head back to our main page.
              </p>
            </div>
            <div class="flex items-center justify-center">
              <Link
                to="/"
                class="flex items-center justify-center py-4 text-gray-800 px-7 rounded bg-lime-300 font-bold uppercase tracking-wide  hover:bg-gray-800 hover:text-lime-300 focus:ring-4 focus:ring-purple-blue-100 transition duration-300"
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

import React from "react";

const ErrorComponent = ({ isError, message }) => {
  return (
    <p className="w-full max-w-xl mt-2 text-sm text-red-800 text-start">{isError && message}</p>
  );
};

export default ErrorComponent;

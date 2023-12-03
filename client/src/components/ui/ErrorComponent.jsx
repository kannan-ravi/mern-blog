import React from "react";

const ErrorComponent = ({ isError, message }) => {
  return (
    <p className="max-w-xl mx-auto mt-2 text-red-800">{isError && message}</p>
  );
};

export default ErrorComponent;

import React from "react";

const ErrorComponent = ({ isError, message }) => {
  return (
    <p className="w-full max-w-xl mx-auto mt-2 text-xs text-red-800 text-start">{isError && message}</p>
  );
};

export default ErrorComponent;

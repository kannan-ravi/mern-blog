import React from "react";

const ButtonComponent = ({
  isLoading,
  buttonText,
  onClick,
  loadingText,
  type,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full px-0 py-2 mt-0 text-xs font-bold uppercase duration-200 bg-black rounded md:text-base md:px-3 text-lime-300 hover:bg-lime-300 hover:text-black"
    >
      {isLoading ? loadingText : buttonText}
    </button>
  );
};

export default ButtonComponent;

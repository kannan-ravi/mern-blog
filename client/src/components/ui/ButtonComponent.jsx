import React from "react";

const ButtonComponent = ({
  isLoading,
  isdisable,
  buttonText,
  onClick,
  loadingText,
  type,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isdisable ? false : true}
      className="w-full px-0 py-2 mt-0 text-xs font-bold uppercase duration-200 bg-black rounded md:text-base md:px-3 text-lime-300 hover:bg-lime-300 hover:text-black disabled:opacity-60 disabled:hover:bg-black disabled:text-lime-300"
    >
      {isLoading ? loadingText : buttonText}
    </button>
  );
};

export default ButtonComponent;

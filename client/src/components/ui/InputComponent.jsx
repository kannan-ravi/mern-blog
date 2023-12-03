import React from "react";

const InputComponent = ({ type, placeholder, name, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      className="w-full px-3 py-2 duration-200 border-b-2 outline-none focus:border-black"
      onChange={onChange}
      required
    />
  );
};

export default InputComponent;

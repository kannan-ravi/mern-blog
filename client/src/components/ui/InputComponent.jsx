import React from "react";

const InputComponent = ({
  type,
  placeholder,
  name,
  onChange,
  defaultValue,
  onKeyDown,
}) => {
  return (
    <input
      type={type}
      defaultValue={defaultValue}
      placeholder={placeholder}
      name={name}
      className="w-full py-2 duration-200 border-b-2 outline-none focus:border-black"
      onChange={onChange}
      onKeyDown={onKeyDown}
      required
    />
  );
};

export default InputComponent;

import React from "react";

const InputComponent = ({
  type,
  placeholder,
  name,
  onChange,
  value,
  onKeyDown,
  className,
}) => {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      name={name}
      className={`w-full py-2 duration-200 border-b-2 outline-none focus:border-black ${className}`}
      onChange={onChange}
      onKeyDown={onKeyDown}
      required
    />
  );
};

export default InputComponent;

import React from "react";

const Button = ({ children, className = "", ...props }) => (
  <button
    className={`px-4 py-2 rounded-md font-semibold transition focus:outline-none focus:ring-2 focus:ring-button-primary bg-button-primary text-white hover:bg-button-hover ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button; 
import React from "react";

export default function Button({ variant = "primary", children, ...props }) {
  const baseStyles =
    "px-4 py-2 rounded font-medium focus:outline-none transition";
  const variantStyles = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-700 text-gray-200 hover:bg-gray-600",
  };

  return (
    <button className={`${baseStyles} ${variantStyles[variant]}`} {...props}>
      {children}
    </button>
  );
}
